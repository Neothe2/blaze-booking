import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  places: Place[] = [];
  private placesSub!: Subscription;

  constructor(private placesService: PlaceService) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.places = places;
    });
  }

  onEdit(placeId: any, slidingItem: IonItemSliding) {
    slidingItem.close();
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  getDummyDate() {
    return new Date();
  }
}
