import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent,
  children: [{
    path: '',
    loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
  },
  {
    path: '',
    loadChildren: () => import('../seller/seller.module').then(m => m.SellerModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
