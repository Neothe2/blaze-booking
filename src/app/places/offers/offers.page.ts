import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  places: Place[] = [];

  constructor(private placesService: PlaceService) {}

  ngOnInit() {
    this.places = this.placesService.getAllPlaces();
  }
}
