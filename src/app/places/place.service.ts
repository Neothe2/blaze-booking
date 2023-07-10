import { Injectable } from '@angular/core';
import { Place } from './place';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  // an array of place classes that have id, title, description, imageUrl and name
  private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([
    new Place(
      '1',
      'The Ritz-Carlton',
      'Luxury hotel with great view',
      'https://th.bing.com/th/id/OIP.AMnKFONVx8pG5-0TdqHUpgHaE8?pid=ImgDet&rs=1',
      500,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'def',
      '123 Luxury Blvd, Ocean View, CA 90210'
    ),
    new Place(
      '2',
      'Marriott Marquis',
      'Comfortable place in the city center',
      'https://th.bing.com/th/id/OIP.KIVGsx63br9t8-jZQrmN1QHaE8?pid=ImgDet&rs=1',
      300,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'abc',
      '456 City Centre Ave, Metropolitan, NY 10001'
    ),
    new Place(
      '3',
      'Hilton',
      'Great value for the price',
      'https://th.bing.com/th/id/OIP.qVB189UPhFwjgFI5wyCixgAAAA?pid=ImgDet&rs=1',
      200,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'def',
      '789 Value Ln, Budgetville, TX 75001'
    ),
    new Place(
      '4',
      'Four Seasons',
      'High-end hotel with top service',
      'https://th.bing.com/th/id/OIP.SJLPBDTX8QTCPw5QYJVQ1wHaFj?w=201&h=180&c=7&r=0&o=5&pid=1.7',
      600,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'abc',
      '321 Highend Heights, Elite, MA 02108'
    ),
    new Place(
      '5',
      'Holiday Inn',
      'Affordable hotel with all necessities',
      'https://th.bing.com/th/id/OIP.rFxz-n63Pqsuqepog_mBlgHaFj?w=278&h=209&c=7&r=0&o=5&pid=1.7',
      100,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'def',
      '654 Basic Blvd, Practical Town, FL 33101'
    ),
    new Place(
      '6',
      'The St. Regis',
      'Luxury establishment with top-notch amenities',
      'https://cache.marriott.com/marriottassets/marriott/HOUXR/houxr-exterior-8282-hor-feat.jpg',
      700,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'abc',
      '987 Prestige Pkwy, Upscale City, IL 60007'
    ),
    new Place(
      '7',
      'Hyatt Regency',
      'Elegant hotel in a beautiful location',
      'https://th.bing.com/th/id/OIP._UunNbGdlm1Yf7xYHkjJjwHaE7?w=284&h=189&c=7&r=0&o=5&pid=1.7',
      350,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'def',
      '147 Elegant St, Scenic Spot, CO 80014'
    ),
    new Place(
      '7',
      'Hyatt Regency',
      'Elegant hotel in a beautiful location',
      'https://th.bing.com/th/id/OIP._UunNbGdlm1Yf7xYHkjJjwHaE7?w=284&h=189&c=7&r=0&o=5&pid=1.7',
      350,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'abc',
      '258 Graceful Ave, Beautiful Area, AZ 85001'
    ),
    new Place(
      '8',
      'Sheraton',
      'Reliable hotel with spacious rooms',
      'https://th.bing.com/th/id/OIP.8nJZa9ACw8HI2F9ofmfoVAHaGX?w=184&h=180&c=7&r=0&o=5&pid=1.7',
      250,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'def',
      '369 Reliable Rd, Spacious Place, GA 30303'
    ),
    new Place(
      '9',
      'Best Western',
      'Best choice for budget travelers',
      'https://qtxasset.com/2016-09/Best-Western-Premier-Miami.jpg?1ruyhACdyruZndTdUR_C7HG71s3H4RKI',
      80,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'abc',
      "159 Budget Blvd, Traveler's Delight, NV 89109"
    ),
    new Place(
      '10',
      'The Westin',
      'Hotel offering wellness options',
      'https://mymandap.in/wp-content/uploads/2019/08/The-westin-hotel-1.jpg',
      400,
      new Date(2023, 1, 1),
      new Date(2023, 11, 31),
      'def',
      '753 Wellness Way, Health Haven, OR 97201'
    ),
  ]);

  constructor(private auth: AuthService) {}

  get places() {
    return this._places.asObservable();
  }

  getPlaceById(id: string) {
    return this._places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((place) => place.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
    location: string,
    imageUrl: string
  ) {
    let place = new Place(
      Math.random().toString(),
      title,
      description,
      imageUrl,
      price,
      availableFrom,
      availableTo,
      this.auth.userId,
      location
    );
    return this._places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(place));
      })
    );
  }

  editPlace(
    id: string,
    title: string,
    description: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    let updatedPlace: Place;

    return this.places.pipe(
      take(1),
      map((places) => {
        const placeIndex = places.findIndex((place) => place.id === id);
        const placeArray = [...places];
        updatedPlace = new Place(
          id,
          title,
          description,
          places[placeIndex].imageUrl,
          price,
          availableFrom,
          availableTo,
          this.auth.userId
        );
        placeArray[placeIndex] = updatedPlace;
        return placeArray;
      }),
      tap((placeArray) => {
        this._places.next(placeArray);
      })
    );
  }

  updatePlace(id: string, partialPlace: Partial<Place>) {
    return this.places.pipe(
      take(1),
      map((places) => {
        const placeIndex = places.findIndex((place) => place.id === id);
        const placeArray = [...places];
        // Create a new Place with the old data and the updates
        const oldPlace = placeArray[placeIndex];
        placeArray[placeIndex] = { ...oldPlace, ...partialPlace };
        return placeArray;
      }),
      tap((placeArray) => {
        this._places.next(placeArray);
      })
    );
  }
}

//     ___
//    (O-O)
//  ----|----
//      |
//     / \
//   _/   \_
