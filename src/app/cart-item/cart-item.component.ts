import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  cartItems: any;
  totals: any;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Subscribe to the cartItems$ observable to get updates
    this.cartService.addToCartCount$.subscribe(items => {
      // Handle the updated cart items in this component
      this.cartItems = items;
      this.totals = this.calculateTotals();

    });
  }

  // Function to calculate total amount and total quantity
  calculateTotals(): { totalAmount: number, totalQuantity: number } {
    const totals = this.cartItems.reduce((acc: { totalAmount: number; totalQuantity: any; }, product: { discountPrice: number; quantity: number; }) => {
      acc.totalAmount += product.discountPrice * product.quantity;
      acc.totalQuantity += product.quantity;
      return acc;
    }, { totalAmount: 0, totalQuantity: 0 });

    // Round the total amount to two decimal places
    totals.totalAmount = parseFloat(totals.totalAmount.toFixed(2));

    return totals;
  }

}
