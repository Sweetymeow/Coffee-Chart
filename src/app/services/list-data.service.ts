import { Injectable } from '@angular/core';
import { Coffee } from '../logic/Coffee';
import { PlaceLocation } from '../logic/PlaceLocation';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ListDataService {
  list: Array<Coffee>;
  public testUrl = "http://localhost:3100";
  configUrl = '../../assets/config.json';

  constructor(private http: HttpClient) { }

  // API Sample: https://costco-bakery-planning.cfapps.sap.hana.ondemand.com/api/warehouse/148/dataUtil/getPredictionPerformanceAnalysis/item_id/14368
  getItem() { }

  /*--------- Get Coffe Obj from Backend by ID ----------*/
  getById(coffeeId: string, callback){
    this.http.get(`${this.testUrl}/coffees/${coffeeId}`)
    .subscribe(response => {
      console.log("Coffee from BE(list-data) => ", response);
      callback(response);
    });
  }

  /*--------- Get All Coffe Obj from Backend ----------*/
  getList(callback) {
    // const list = [
    //   new Coffee('Expresso', "Sunny CAFE", new PlaceLocation("123 Market St", "SF", 0, 0)),
    //   new Coffee('Caramel Americano', "Starbuck", new PlaceLocation('Gran Via 34', "Madrid"))
    // ];
    // callback(this.list);

    this.http.get(`${this.testUrl}/coffees`)
      .subscribe(response => {
        console.log("Coffee from BE(list-data) => ", response);
        callback(response);
      }, error => {
        console.error(error);
      });
  }

  // return: http object need to attach .subscribe(()=>{})
  getListbyConfig(){
    return this.http.get(this.configUrl);
  }

  /*--------- Update/Insert Coffee Obj to Backend ----------*/
  saveData(coffee, callback) {
    if (coffee._id) {
      // It's an update
      this.http.put(`${this.testUrl}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true);
        });
    } else {
      // it's an insert
      this.http.post(`${this.testUrl}/coffees`, coffee)
        .subscribe(response => {
          callback(true);
        });
    }
  }

}
