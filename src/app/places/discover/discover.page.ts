import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[] = [];

  constructor(
    private placesService: PlaceService,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.places = this.placesService.getAllPlaces();
  }

  onOpen() {
    this.menuController.open('m1');
  }
}
