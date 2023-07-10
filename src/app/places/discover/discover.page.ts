import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[] = [];
  placesSub: any;

  // isToolbarHidden = false;

  // scrollHandler(event: any) {
  //   this.isToolbarHidden = event.detail.scrollTop > 50; // you can customize the scroll distance here
  // }

  constructor(
    private placesService: PlaceService,
    private menuController: MenuController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.places = places;
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onOpen() {
    this.menuController.open('m1');
  }

  onFilterUpdate(event: any) {
    if (event.detail.value === 'all') {
      this.placesService.places.subscribe((places) => {
        this.places = places;
      });
    } else {
      this.placesService.places.subscribe((places) => {
        this.places = places.filter(
          (place) => place.userId != this.auth.userId
        );
      });
    }
  }
}
