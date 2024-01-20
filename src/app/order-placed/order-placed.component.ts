import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Product } from '../product/models/Product.model';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {
  cartItems: Product[] = [];
  totals: any;
  constructor(private cartService: CartService) {

   }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totals = this.calculateTotals();
  }

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
