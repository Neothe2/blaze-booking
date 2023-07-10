import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BookingService } from '../bookings.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})
export class CreateBookingPage implements OnInit {
  form: FormGroup;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      guests: ['2', [Validators.required]],
      from: [new Date().toISOString(), [Validators.required]],
      to: [new Date().toISOString(), [Validators.required]],
    });
  }

  @Input() place?: any;
  @Input() mode?: 'select' | 'random';

  ngOnInit() {
    const availableFrom = new Date(this.place?.availableFrom);
    const availableTo = new Date(this.place?.availableTo);
    const currentDate = new Date(); // getting the current date

    // ensuring that the starting date is either the 'availableFrom' or the current date, whichever is later
    const startingDate =
      availableFrom > currentDate ? availableFrom : currentDate;

    if (this.mode === 'select') {
    } else if (this.mode === 'random') {
      const from = new Date(
        startingDate.getTime() +
          Math.random() * (availableTo.getTime() - startingDate.getTime())
      );
      const to = new Date(from.getTime());
      to.setDate(from.getDate() + 7); // set 'to' date 7 days (1 week) away from 'from'

      // to ensure 'to' does not exceed 'availableTo'
      if (to.getTime() > availableTo.getTime()) {
        to.setTime(availableTo.getTime());
      }

      this.form.patchValue({
        from: from.toISOString(),
        to: to.toISOString(),
      });
    }
  }

  //   const availableFrom = new Date(this.place?.availableFrom);
  // const availableTo = new Date(this.place?.availableTo);

  // if (this.mode === 'select') {
  // } else if (this.mode === 'random') {
  //   const from = new Date(
  //     availableFrom.getTime() +
  //       Math.random() * (availableTo.getTime() - availableFrom.getTime())
  //   );
  //   const to = new Date(
  //     from.getTime() +
  //       Math.random() * (availableTo.getTime() - from.getTime())
  //   );
  //   this.form.patchValue({
  //     from: from.toISOString(),
  //     to: to.toISOString(),
  //   });
  // }

  // Getter for first_name field
  get firstName() {
    return this.form.get('first_name');
  }

  // Getter for last_name field
  get lastName() {
    return this.form.get('last_name');
  }

  // Getter for guests field
  get guests() {
    return this.form.get('guests');
  }

  // Getter for from field
  get availableFrom() {
    return this.form.get('from');
  }

  // Getter for to field
  get availableTo() {
    return this.form.get('to');
  }

  onCancel() {
    this.modalController.dismiss(
      { message: 'The booking has been canceled!' },
      'cancel'
    );
  }

  onBookPlace() {
    console.log(this.form.get('from'));
    this.bookingService
      .addBooking(
        this.place.id,
        this.place.title,
        this.place.image,
        this.firstName?.value,
        this.lastName?.value,
        this.guests?.value,
        new Date(this.availableFrom?.value),
        new Date(this.availableTo?.value)
      )
      .subscribe();
    this.modalController.dismiss(
      {
        bookingData: {
          first_name: this.firstName?.value,
          last_name: this.lastName?.value,
          guestNumber: this.guests?.value,
          from: new Date(this.availableFrom?.value),
          to: new Date(this.availableTo?.value),
        },
      },
      'confirm'
    );
  }

  datesValid() {
    const from = new Date(this.form.get('from')!.value);
    const to = new Date(this.form.get('to')!.value);
    return from < to;
  }
}
