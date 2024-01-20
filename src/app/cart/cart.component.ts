import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Product } from '../product/models/Product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: any;
  couponCode: any;
  appliedCoupon: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the cartItems$ observable to get updates
    this.cartService.addToCartCount$.subscribe(items => {
      // Handle the updated cart items in this component
      this.cartItems = items;
      this.calculateTotals();
    });
    // Subscribe to the appliedCoupon$ observable to get applied coupon updates
    this.cartService.appliedCoupon$.subscribe(coupon => {
      this.appliedCoupon = coupon;
      console.log('Applied Coupon:', this.appliedCoupon);
      // Update the total whenever the coupon changes
      this.calculateTotals();
    });
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  // Example method to remove an item from the cart
  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.calculateTotals();
  }

  incrementCartItem(item: any) {
    // Increment the quantity of the item in the cart
    item.quantity++;
    this.calculateTotals();
    this.cartService.addToCart(item);
  }

  decrementCartItem(item: any) {
    // Decrement the quantity of the item in the cart, if greater than 1
    if (item.quantity > 1) {
      item.quantity--;
    }    
    this.cartService.addToCart(item);
    this.calculateTotals();
  }

  // Function to calculate total amount and total quantity
  calculateTotals() {
    const totals = this.cartItems.reduce((acc, product) => {
      acc.totalQuantity += product.quantity;
      return acc;
    }, { totalAmount: 0, totalQuantity: 0 });

    // Round the total amount to two decimal places
    totals.totalAmount = this.cartService.calculateTotalWithCoupon();

    this.total = totals;
  }

  applyPercentageDiscountCoupon(): void {
    this.cartService.applyCoupon(this.couponCode);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/home/checkout']);
  }

}
