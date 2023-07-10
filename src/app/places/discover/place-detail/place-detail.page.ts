import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../place.service';
import { Place } from '../../place';
import { Location } from '@angular/common';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { CreateBookingPage } from 'src/app/bookings/create-booking/create-booking.page';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  placeSub: any;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private placesService: PlaceService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  place!: Place;
  bookable: boolean = true;

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    if (placeId) {
      this.placeSub = this.placesService
        .getPlaceById(placeId)
        .subscribe((place: any) => {
          this.place = place;
          this.bookable = this.auth.userId !== this.place.userId;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCtrl
      .create({
        component: CreateBookingPage,
        componentProps: {
          place: this.place,
          mode: mode,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData: any) => {
        if (resultData.role == 'confirm') {
          // console.log('Booked');
        }
      });
    console.log(mode);
  }
}
