import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Coffee } from '../../logic/Coffee';
import { TastingRating } from '../../logic/TastingRating';

import { GeoLocationService } from '../../services/geo-location.service';
import { ListDataService } from '../../services/list-data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})

export class CoffeeComponent implements OnInit {
  sliderConfige: any = { max: 10, min: 0, tickInt: 1 };
  routingSubscription: any;
  coffee: Coffee;
  types: Array<string> = ['Cappuccino', 'Flat White', "Espresso", "Black Coffee", "Cold Brew", "Drip"];

  tastingEnable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Use to router.navigate to other page
    private geoLoc: GeoLocationService,
    private data: ListDataService) { }

  ngOnInit() {
    this.coffee = new Coffee();

    // Get coffee obj for Edit
    this.routingSubscription = this.route.params.subscribe(params => {
      console.log("Router id:", params);

      if(params.id){
        this.data.getById(params.id, response =>{
          this.coffee = response;
          if(Object.keys(this.coffee.tastingRating).length > 0){
            this.tastingEnable = true;
            console.log(`tastingRating is ${this.tastingEnable}`);
          }
        })
      }

    });

    this.geoLoc.requestLocation( location => {
      if(location){
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }

  ngOnDestory(){
    this.routingSubscription.unsubscribe();
  }

  onRatingChanged(checked : boolean){
    // console.log(`Rating - Checked is ${checked}`)
    if(checked){
      this.coffee.tastingRating = new TastingRating();
    }else{
       this.coffee.tastingRating = null;
    }
  }

  /*-------- Handel Form Button Events (Save / Cancel)---------*/
  onSaveBtnPress(){ // Save to BE service
    this.data.saveData(this.coffee, result => { // callback
      if(result){
        this.router.navigate(['/']);
        console.log(result, this.coffee);
      }
    });
  }
  onCancelBtnPress(){ // Clear the data & return to previous page
    // Need Router API
    this.router.navigate(['/']);
    console.log(this.coffee);
  }

}
