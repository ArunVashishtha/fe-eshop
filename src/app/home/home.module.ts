import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
