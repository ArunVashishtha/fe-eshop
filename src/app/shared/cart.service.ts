import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product/models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private appliedCouponSubject = new BehaviorSubject<string>('');
  appliedCoupon$ = this.appliedCouponSubject.asObservable();
  private addToCartCountSubject = new BehaviorSubject<Product[]>([]);
  addToCartCount$ = this.addToCartCountSubject.asObservable();
 
  // Method to get the current cart items
  getCartItems(): any[] {
    return this.addToCartCountSubject.value;
  }

  // Method to add a new item to the cart
  addToCart(item: any): void {
    const currentCartItems = this.getCartItems();
    const existingItemIndex = currentCartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      // Item already exists, update the count
      currentCartItems[existingItemIndex].quantity = item.quantity;
    } else {
      // Item is new, insert it into the cart
      currentCartItems.push(item);
    }

    this.addToCartCountSubject.next([...currentCartItems]);
}

  // Method to remove an item from the cart
  removeFromCart(item: any): void {
    const currentCartItems = this.getCartItems();
    const updatedCartItems = currentCartItems.filter(cartItem => cartItem !== item);
    this.addToCartCountSubject.next(updatedCartItems);
  }

  // Method to clear all items from the cart
  clearCart(): void {
    this.addToCartCountSubject.next([]);
  }
  // Method to apply a coupon
  applyCoupon(couponCode: string): void {
   this.appliedCouponSubject.next(couponCode);
  }

  // Method to clear applied coupon
  clearCoupon(): void {
    this.appliedCouponSubject.next('');
  }

  calculateTotalWithCoupon(): number {
    const currentCartItems = this.getCartItems();
   const appliedCoupon = this.appliedCouponSubject.value;
   const totalAmount = currentCartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
     
    if (appliedCoupon === 'Happy10') {
      const totalAmount = currentCartItems.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
      // Apply a percentage discount (e.g., 10%)
      const discountPercentage = 10;
      const discountAmount = (discountPercentage / 100) * totalAmount;

      // Subtract the discount amount from the total
      const discountedTotal = totalAmount - discountAmount;

      return discountedTotal >= 0 ? discountedTotal : 0;
    } else {
      // No coupon or unknown coupon code, return the regular total
      return totalAmount;
    }
  }
}
