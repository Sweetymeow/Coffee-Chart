import { Injectable } from '@angular/core';
import { PlaceLocation } from '../logic/PlaceLocation';

@Injectable()
export class GeoLocationService {

  constructor() { }

  requestLocation(callback){
    // W3C GeoLocation API
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);
      },
      error => {
        callback(null);
      }
    )
  }

  getMapLink(location: PlaceLocation){
    let query = "";
    if (location.latitude){
      query = location.latitude + ", " + location.longitude;
    } else {
      query = `${location.address}, ${location.city}`;
    }

    // Check Devices Type - RegExp
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)){ // Apple Devices
      return `https://maps.apple.com/?q=${query}`;
    }else{ // PC or Android Devices
      return `https://maps.google.com/?q=${query}`;
    }

    // Universal Link
    // <a href="https://maps.google.com/?q=Eiffel+Tower"></a>
    // <a href="https://maps.google.com/?q=34.44,56.44"></a>
  }

}
