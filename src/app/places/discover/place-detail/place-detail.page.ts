import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../place.service';
import { Place } from '../../place';
import { Location } from '@angular/common';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private placesService: PlaceService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  place?: any;

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    console.log(placeId);
    if (placeId) {
      this.place = this.placesService.getPlaceById(placeId);
    }
  }

  onBookPlace() {
    this.modalCtrl
      .create({ component: CreateBookingComponent })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
