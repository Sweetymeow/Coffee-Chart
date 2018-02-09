import { PlaceLocation } from '../logic/PlaceLocation';
import { TastingRating } from '../logic/TastingRating';

export class Coffee{
  // Properties
  _id: string; // Created by db for each item
  type: string;
  rating: number;
  notes: string;
  tastingRating: TastingRating;

  constructor(public name: string = "",
      public place: string = "",
      public location: PlaceLocation = null){
        this.location = new PlaceLocation();
        this.tastingRating = new TastingRating();
  }
}
