import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product/models/Product.model';
import { ApiService } from '../core/services/api.service';
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private appliedCouponSubject = new BehaviorSubject<string>('');
  appliedCoupon$ = this.appliedCouponSubject.asObservable();
  private addToCartCountSubject = new BehaviorSubject<Product[]>([]);
  addToCartCount$ = this.addToCartCountSubject.asObservable();
  constructor(
    private apiService: ApiService,
    
  ) { }
  // Method to get the current cart items
  getCartItems(): any[] {
    return this.addToCartCountSubject.value;
  }

  // Method to add a new item to the cart
  addToCart(item: any, userId: string): void {
    const currentCartItems = this.getCartItems();
    const existingItemIndex = currentCartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      // Item already exists, update the count
      currentCartItems[existingItemIndex].quantity = item.quantity;
    } else {
      // Item is new, insert it into the cart
      currentCartItems.push(item);
    }
    this.updateCartItem(userId, item._id, item.quantity);
    this.addToCartCountSubject.next([...currentCartItems]);
}

  // Method to remove an item from the cart
  removeFromCart(item: any, userId:string): void {
    const currentCartItems = this.getCartItems();
    const updatedCartItems = currentCartItems.filter(cartItem => cartItem !== item);
    this.addToCartCountSubject.next(updatedCartItems);
    this.removeCartItem(userId, item.id);
  }

  // Method to clear all items from the cart
  clearCart(userId?:string): void {
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
      const totalAmount = currentCartItems.reduce((acc, item) => item.mrp * item.quantity, 0);
      // Apply a percentage discount (e.g., 10%)
      const discountPercentage = 10;
     const discountAmount = (discountPercentage / 100) * totalAmount;

      // Subtract the discount amount from the total
      const discountedTotal = totalAmount - discountAmount;
      currentCartItems.forEach(item => {
        const discountPrice = (discountPercentage / 100) * item.mrp
        item.discountPrice = item.mrp * item.quantity - discountPrice * item.quantity;
      });
      return discountedTotal >= 0 ? discountedTotal : 0;
    } else {
      // No coupon or unknown coupon code, return the regular total
      return totalAmount;
    }
  }
  getCart(userId: string): Observable<CartItem[]> {
    return this.apiService.getCart(userId).get();
  }

  updateCartItem(userId: string, itemId: string, data: { quantity: number }): Observable<any> {
    const routeParams = { userId, itemId };
    return this.apiService.updateCartItem().put(routeParams, data);
  }

  removeCartItem(userId: string, itemId: string): Observable<any> {
    const routeParams = { userId, itemId };
    return this.apiService.removeCartItem().delete(routeParams);
  }
}
