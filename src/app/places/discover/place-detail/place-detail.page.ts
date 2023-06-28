import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../place.service';
import { Place } from '../../place';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private placesService: PlaceService,
    private navCtrl: NavController
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
    this.navCtrl.navigateBack('/places/tabs/discover');
  }
}
