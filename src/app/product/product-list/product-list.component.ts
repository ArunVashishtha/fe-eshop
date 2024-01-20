import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // query: string | null = null;
  product: Product | undefined; // Define the product type
  searchResults: any[] = [];
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private searchService: SearchService) { }

  ngOnInit(): void {

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
}
