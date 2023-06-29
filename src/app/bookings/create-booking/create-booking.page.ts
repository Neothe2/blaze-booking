import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})
export class CreateBookingPage implements OnInit {
  constructor(private modalController: ModalController) {}

  @Input() place?: any;

  ngOnInit() {}

  onCancel() {
    this.modalController.dismiss(
      { message: 'The booking has been canceled!' },
      'cancel'
    );
  }

  onBookPlace() {
    this.modalController.dismiss({ message: 'Booking!' }, 'confirm');
  }
}
