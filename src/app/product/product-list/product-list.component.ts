import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SearchService } from '../../search/search.service';
import { CartService } from 'src/app/shared/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileData } from 'src/app/core/models/auth-models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // query: string | null = null;
  product: Product | undefined; // Define the product type
  searchResults: any[] = [];
  userId = "";
  profileData!: ProfileData | null;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private searchService: SearchService,
    private cartService: CartService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.profileData.subscribe(res => {
      this.profileData = res;
      this.userId = this.profileData?._id || "";
    });
    this.route.queryParams.subscribe(params => {
      const paramValue = params['category'];
      console.log('Received parameter:', paramValue);
      if (paramValue) {
        this.loadProductsFromElastic(paramValue);
      } else {
        // Get all products irrespective of category
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(results => {
      this.searchResults = results;
    })
  }

  loadProductsFromElastic(query:string): void {
    this.searchService.search(query).subscribe(results => {
      this.searchResults = results;
    })
  }
  addToCart(product: any) {
    this.cartService.addToCart(product, this.userId);
  }
}
