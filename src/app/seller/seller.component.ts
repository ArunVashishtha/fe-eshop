import { Component, OnInit } from '@angular/core';
import { Product } from '../product/models/Product.model';
import { SellerProductsService } from './services/seller-products.service';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  sellerId: string = '609c2227b6bd730022fcec33'; // Replace with the actual sellerId
  products: Product[] = [];

  constructor(private sellerProductService: SellerProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.sellerProductService.getProductsBySellerId(this.sellerId).subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(product: Product) {
    // Implement your edit logic here
    // You might want to navigate to an edit page or open a modal for editing
  }

  deleteProduct(productID: string) {
    this.sellerProductService.deleteProductBySellerId(productID, this.sellerId).subscribe(() => {
      this.loadProducts(); // Reload the products after deletion
    });
  }

  confirmDelete(productId: string): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      this.deleteProduct(productId);
    }
  }
}
