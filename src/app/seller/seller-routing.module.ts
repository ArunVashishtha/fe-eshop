import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';

const routes: Routes = [
  { path: '', component: SellerComponent },
  {
    component:SellerAddProductComponent,
    path:'seller-add-product',
  },
  {
    component:SellerAddProductComponent,
    path:'seller-update-product/:id',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
