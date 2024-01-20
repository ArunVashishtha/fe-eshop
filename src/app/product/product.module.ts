import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { OrderPlacedComponent } from '../order-placed/order-placed.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    OrderPlacedComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [ ProductService ]
})
export class ProductModule { }
