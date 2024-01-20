import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SearchComponent} from '../search/search/search.component';

import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { CartItemComponent } from '../cart-item/cart-item.component';

const components = [
  HeaderComponent,
  CartItemComponent,
  NavComponent,
  FooterComponent,
  SearchComponent,
  LoaderComponent
]

@NgModule({
  declarations: [
    ...components,
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
