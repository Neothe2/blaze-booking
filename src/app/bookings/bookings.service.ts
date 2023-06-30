import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: '1',
      placeTitle: 'The Ritz-Carlson',
      guestNumber: 2,
      userId: 'abc',
    },
  ];

  constructor() {}

  getBookins() {
    return [...this._bookings];
  }
}
