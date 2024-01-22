// product-detail.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product.model';
import { Location } from '@angular/common';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | any; // Define the product type
  cartItems: Product[] = [];
  @Output() addToCartCountUpdate = new EventEmitter<Product[]>();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      // Load product details based on productId
      this.loadProductDetails();
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  incrementCartItem(item: any) {
    // Increment the quantity of the item in the cart
    item.quantity++;
  }

  decrementCartItem(item: any) {
    // Decrement the quantity of the item in the cart, if greater than 1
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  updateCartOnServer() {
    console.log("items", this.cartItems)
    this.cartService.addToCart(this.cartItems);
  }

  loadProductDetails(): void {
    if (this.productId) {
      console.log(this.productId);
      this.productService.getProductById(this.productId).subscribe((product: any) => {
        this.product = product;
        if (this.product) {
          this.product.quantity = 1;
        }
        console.log(product);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
