import { Injectable } from '@angular/core';
import { Place } from './place';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  // an array of place classes that have id, title, description, imageUrl and name
  private _places: Place[] = [];

  constructor() {
    this._places.push(
      new Place(
        '1',
        'The Ritz-Carlton',
        'Luxury hotel with great view',
        'https://th.bing.com/th/id/OIP.AMnKFONVx8pG5-0TdqHUpgHaE8?pid=ImgDet&rs=1',
        500
      )
    );
    this._places.push(
      new Place(
        '2',
        'Marriott Marquis',
        'Comfortable place in the city center',
        'https://th.bing.com/th/id/OIP.KIVGsx63br9t8-jZQrmN1QHaE8?pid=ImgDet&rs=1',
        300
      )
    );
    this._places.push(
      new Place(
        '3',
        'Hilton',
        'Great value for the price',
        'https://th.bing.com/th/id/OIP.qVB189UPhFwjgFI5wyCixgAAAA?pid=ImgDet&rs=1',
        200
      )
    );
    this._places.push(
      new Place(
        '4',
        'Four Seasons',
        'High-end hotel with top service',
        'https://th.bing.com/th/id/OIP.SJLPBDTX8QTCPw5QYJVQ1wHaFj?w=201&h=180&c=7&r=0&o=5&pid=1.7',
        600
      )
    );
    this._places.push(
      new Place(
        '5',
        'Holiday Inn',
        'Affordable hotel with all necessities',
        'https://th.bing.com/th/id/OIP.rFxz-n63Pqsuqepog_mBlgHaFj?w=278&h=209&c=7&r=0&o=5&pid=1.7',
        100
      )
    );
    this._places.push(
      new Place(
        '6',
        'The St. Regis',
        'Luxury establishment with top-notch amenities',
        'https://cache.marriott.com/marriottassets/marriott/HOUXR/houxr-exterior-8282-hor-feat.jpg',
        700
      )
    );
    this._places.push(
      new Place(
        '7',
        'Hyatt Regency',
        'Elegant hotel in a beautiful location',
        'https://th.bing.com/th/id/OIP._UunNbGdlm1Yf7xYHkjJjwHaE7?w=284&h=189&c=7&r=0&o=5&pid=1.7',
        350
      )
    );
    this._places.push(
      new Place(
        '8',
        'Sheraton',
        'Reliable hotel with spacious rooms',
        'https://th.bing.com/th/id/OIP.8nJZa9ACw8HI2F9ofmfoVAHaGX?w=184&h=180&c=7&r=0&o=5&pid=1.7',
        250
      )
    );
    this._places.push(
      new Place(
        '9',
        'Best Western',
        'Best choice for budget travelers',
        'https://qtxasset.com/2016-09/Best-Western-Premier-Miami.jpg?1ruyhACdyruZndTdUR_C7HG71s3H4RKI',
        80
      )
    );
    this._places.push(
      new Place(
        '10',
        'The Westin',
        'Hotel offering wellness options',
        'https://mymandap.in/wp-content/uploads/2019/08/The-westin-hotel-1.jpg',
        400
      )
    );
  }

  getAllPlaces() {
    return [...this._places];
  }

  getPlaceById(id: string) {
    return { ...this._places.find((place) => place.id === id) };
  }
}
