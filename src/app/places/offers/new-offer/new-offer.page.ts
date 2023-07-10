import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from '../../place.service';
import { Router } from '@angular/router';
import { IonicRouteStrategy, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  imageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private loadCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      shortDesc: ['', [Validators.required, Validators.maxLength(180)]],
      location: ['', [Validators.required]],
      price: [0, [Validators.required]],
      availableFrom: [new Date().toISOString(), [Validators.required]],
      availableTo: [new Date().toISOString(), [Validators.required]],
    });
  }

  formValid() {
    return this.form.valid && this.imageUrl;
  }

  ngOnInit() {}

  onCreateOffer() {
    this.loadCtrl.create({ message: 'Creating place...' }).then((loadingEl) => {
      loadingEl.present();
    });
    this.placeService
      .addPlace(
        this.form.value.title,
        this.form.value.shortDesc,
        this.form.value.price,
        new Date(this.form.value.availableFrom),
        new Date(this.form.value.availableTo),
        this.form.value.location,
        this.imageUrl
      )
      .subscribe(() => {
        this.router.navigate(['/places/tabs/offers']);
        this.loadCtrl.dismiss();
        this.form.reset();
      });
  }

  onImagePicked(event: any) {
    this.imageUrl = event;
  }
}
