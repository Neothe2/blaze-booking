import { Component, OnInit } from '@angular/core';
import { BookingService } from './bookings.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.bookings.subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  onCancelBooking(booking: any) {
    this.bookingService.cancelBooking(booking.id).subscribe();
  }
}
