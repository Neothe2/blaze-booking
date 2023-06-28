import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
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
}
