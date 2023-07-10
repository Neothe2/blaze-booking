import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items = [
    { title: 'Item 1', description: 'This is item 1' },
    { title: 'Item 2', description: 'This is item 2' },
    { title: 'Item 3', description: 'This is item 3' },
    { title: 'Item 4', description: 'This is item 4' },
    { title: 'Item 5', description: 'This is item 5' },
    // Add more items as needed
  ];
}
