import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apiService: ApiService
  ) { }

  getProductById(id: string) {
    return this.apiService.getProductById.get(undefined, {id});
  }

  getAllProducts() {
    return this.apiService.getAllProducts.get();
  }

  getCategories() {
    return this.apiService.getCategories.get();
  }

  getSubCategories() {
    return this.apiService.getSubCategories.get();
  }
}
