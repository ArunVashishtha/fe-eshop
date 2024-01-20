import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { OrderPlacedComponent } from '../order-placed/order-placed.component';

const routes: Routes = [
{
  component:CartComponent,
  path:'cart-page'
},{
  component:CheckoutComponent,
  path:'checkout'
  },
  {
    component:OrderPlacedComponent,
    path:'orderplaced'
    },
  { path: '', component: ProductListComponent },

  { path: ':id', component: ProductDetailComponent },

  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
