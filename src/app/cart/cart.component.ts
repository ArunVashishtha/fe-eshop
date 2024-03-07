import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../shared/cart.service';
import { Product } from '../product/models/Product.model';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ProfileData } from '../core/models/auth-models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  storedCardItems: CartItem[] = [];
  userId = "";
  total: any;
  couponCode: any;
  appliedCoupon: string = '';
  profileData!: ProfileData | null;

  constructor(private cartService: CartService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.profileData.subscribe(res => {
      this.profileData = res;
      this.userId = this.profileData?._id || "";
    });
    // Subscribe to the cartItems$ observable to get updates
    this.cartService.addToCartCount$.subscribe(items => {
      // Handle the updated cart items in this component
      this.cartItems = items;
      this.calculateTotals();
    });
    // Subscribe to the appliedCoupon$ observable to get applied coupon updates
    this.cartService.appliedCoupon$.subscribe(coupon => {
      this.appliedCoupon = coupon;
      // Update the total whenever the coupon changes
      this.calculateTotals();
    });
    this.loadCartItems();
  }
  checkandsavecart() {
    this.cartService.getCartItems();
  }
  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  // Example method to remove an item from the cart
  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item, this.userId);
    this.calculateTotals();
  }

  incrementCartItem(item: any) {
    // Increment the quantity of the item in the cart
    item.quantity++;
    this.calculateTotals();
    this.cartService.addToCart(item, this.userId);
  }

  decrementCartItem(item: any) {
    // Decrement the quantity of the item in the cart, if greater than 1
    if (item.quantity > 1) {
      item.quantity--;
    }    
    this.cartService.addToCart(item, this.userId);
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

  fetchCart(): void {
    this.cartService.getCart(this.userId).subscribe(cartItems => {
      this.storedCardItems = cartItems;
    });
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    this.cartService.updateCartItem(this.userId, itemId, { quantity: newQuantity })
      .subscribe(() => {
        // Update the local state or refetch the cart
        this.fetchCart();
      });
  }

  removeItem(itemId: string): void {
    this.cartService.removeCartItem(this.userId, itemId).subscribe(() => {
      // Update the local state or refetch the cart
      this.fetchCart();
    });
  }

}
