import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  placeSub: any;
  constructor(
    private route: ActivatedRoute,
    private placesService: PlaceService,
    private navCtrl: NavController
  ) {}

  place!: any;

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    console.log(placeId);
    if (placeId) {
      this.placeSub = this.placesService
        .getPlaceById(placeId)
        .subscribe((place) => (this.place = place));
    }
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
