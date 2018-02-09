import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Coffee } from '../../logic/Coffee';
import { ListDataService } from '../../services/list-data.service';
// import { GoogleNewsService } from '../../services/google-news.service';
import { GeoLocationService } from '../../services/geo-location.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  title: string
  list: [Coffee]

  constructor(private chartData: ListDataService,
    private router: Router,
    private geoLoc : GeoLocationService ) {
    this.title = "List Comp";
  }

  ngOnInit() {
    // get Coffee List Data from BE server
    this.chartData.getList( dataList => {
      this.list = dataList;
    });

    // this.news.sendFetch();
  }

  /*-------------Press Map Button--------------------*/
  /* To open the maps application we just need to change the url of the browser. On mobile devices, when the url is a universal link so that means there is a native app listening for that url, the native app will appear. */
  onGoMap(coffee: Coffee){
    const mapURL = this.geoLoc.getMapLink(coffee.location);
    location.href = mapURL; // location.href: current location of the browser
  }
  /*-------------Press Share Button--------------------*/
  onShare(coffee: Coffee){
    const shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} state`;

    if('share' in navigator){ // web share API
      (navigator as any).share({ // navigator['share']
        url: window.location.href,
        text: shareText,
        title: coffee.name
      })
      .then( () => {
        console.log("shared!");
      })
      .catch( () => {
        console.log("error sharing.");
      });
    }else{ // Using Whatsapp API
      const shareURL = `whatsapp://send?${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }
  /*-------------Press List Button--------------------*/
  onGoDetials(coffee: Coffee){ // Go other URL using Router
    this.router.navigate(['/coffee', coffee._id])
  }

}
