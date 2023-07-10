import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place';
import { PlaceService } from '../../place.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form!: FormGroup;
  places: any[] = [];
  place: any = {};
  placeSub: any;

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('placeId');
    console.log(placeId);
    if (placeId) {
      this.placeSub = this.placeService
        .getPlaceById(placeId)
        .subscribe((place) => (this.place = place));
      this.form = this.fb.group({
        title: [this.place.title, [Validators.required]],
        shortDesc: [
          this.place.description,
          [Validators.required, Validators.maxLength(180)],
        ],
      });
    }
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onCreateOffer() {
    this.placeService
      .updatePlace(this.place.id, {
        title: this.form.value.title,
        description: this.form.value.shortDesc,
      })
      .subscribe();
    this.form.reset();
  }
}
