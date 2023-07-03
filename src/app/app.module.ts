import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HideHeaderDirective } from './hide-header.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ScrollableHeaderComponent } from './scrollable-header/scrollable-header.component';
// import { ScrollableHeaderModule } from './scrollable-header/scrollable-header.module';

@NgModule({
  declarations: [AppComponent, HideHeaderDirective],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    // ScrollableHeaderModule,
    // ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
