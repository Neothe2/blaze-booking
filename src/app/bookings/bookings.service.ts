import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: '1',
      placeTitle: 'The Ritz-Carlton',
      guestNumber: 2,
      userId: '123',
    },
    {
      id: 'abc',
      placeId: '2',
      placeTitle: 'Marriott Marquis',
      guestNumber: 3,
      userId: '345',
    },
    {
      id: 'efg',
      placeId: '3',
      placeTitle: 'Hilton',
      guestNumber: 4,
      userId: '678',
    },
    {
      id: 'hig',
      placeId: '4',
      placeTitle: 'Four Seasons',
      guestNumber: 5,
      userId: '901',
    },
    {
      id: 'klm',
      placeId: '5',
      placeTitle: 'Holiday Inn',
      guestNumber: 6,
      userId: '901',
    },
  ];

  constructor() {}

  getBookins() {
    return [...this._bookings];
  }

  cancelBooking(bookingId: string) {
    //deletes a booking
    this._bookings = this._bookings.filter(
      (booking) => booking.id !== bookingId
    );
  }
}
