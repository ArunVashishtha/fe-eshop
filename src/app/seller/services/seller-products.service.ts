import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SellerProductsService {
  
  constructor(private apiService: ApiService) {}

  // Create a new product for a specific seller
  createProduct(sellerId: string, productData: any): Observable<any> {
    return this.apiService.createSellerProduct(sellerId).post(productData);
  }

  // Get products for a specific seller
  getProductsBySellerId(sellerId: string): Observable<any> {
    return this.apiService.getAllSellerProducts(sellerId).get();
  }

  // Get details of a specific product for a specific seller by ID
  getProductBySellerId(productId: string, sellerId: string): Observable<any> {
    return this.apiService.getSellerOneProduct(productId, sellerId).get();
  }

  // Update details of a specific product for a specific seller by ID
  updateProductBySellerId(productId: string, sellerId: string, productData: any): Observable<any> {
    return this.apiService.updateSellerProduct(productId, sellerId, productData).put({ sellerId }, productData);
  }

  // Delete a specific product for a specific seller by ID
  deleteProductBySellerId(productId: string, sellerId: string): Observable<any> {
    return this.apiService.deleteSellerProduct(productId, sellerId).delete({ sellerId });
  }
}
