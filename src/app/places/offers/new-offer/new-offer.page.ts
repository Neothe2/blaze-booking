import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  items = [
    { title: 'Item 1', description: 'Description 1' },
    { title: 'Item 2', description: 'Description 2' },
    { title: 'Item 3', description: 'Description 3' },
    { title: 'Item 4', description: 'Description 4' },
    // Add as many items as you want here...
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      shortDesc: ['', [Validators.required]],
      price: ['', [Validators.required]],
      availableFrom: ['', [Validators.required]],
      availableTo: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onCreateOffer() {}
}
