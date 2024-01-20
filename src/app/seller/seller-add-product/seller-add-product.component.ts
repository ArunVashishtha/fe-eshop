import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { SellerProductsService } from '../services/seller-products.service';
import { ProductService } from 'src/app/product/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent implements OnInit {
  productForm: FormGroup;
  subcategories: any;
  categories: any;
  productId: any;
  sellerId: string = '609c2227b6bd730022fcec33';
  constructor(private fb: FormBuilder,
    private sellerService: SellerProductsService,
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      mrp: [null, Validators.required],
      discountPrice: [null, Validators.required],
      variations: this.fb.array([
        this.fb.group({
          color: ['', Validators.required],
          size: ['', Validators.required],
          stock: [0, Validators.required],
          images: this.fb.array([
            this.fb.group({
              url: ['', Validators.required],
              altText: ['', Validators.required],
            })
          ])
        })
      ]),
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      brand: ['', Validators.required],
      sellers: this.fb.array([
        this.fb.group({
          sellerId: ['', Validators.required],
          stock: [0, Validators.required],
          sellerPrice: [0, Validators.required],
        })
      ]),
    });
    this.productForm.patchValue({
          category: 'defaultCategoryId',
          subcategory: 'defaultSubcategoryId',
        });
    this.loadCategories();
  }
  loadCategories(): void {
    // Call your service to fetch categories and subcategories
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );

    this.productService.getSubCategories().subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
      },
      (error) => {
        console.error('Error loading subcategories:', error);
      }
    );

    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.sellerService.getProductBySellerId(productId, this.sellerId).subscribe((data: any) => {
        console.warn(data);
        this.productId = productId;
        this.productForm.patchValue(data);
      });
  }

  get variationsArray(): FormArray {
    return this.productForm.get('variations') as FormArray;
  }

  getImagesArray(variation: AbstractControl): FormArray {
    return variation.get('images') as FormArray;
  }

  addVariation(): void {
    this.variationsArray.push(
      this.fb.group({
        color: ['', Validators.required],
        size: ['', Validators.required],
        stock: [null, Validators.required],
        images: this.fb.array([]),
      })
    );
  }

  addImage(variationIndex: number): void {
    const imagesArray = this.variationsArray.at(variationIndex).get('images') as FormArray;
    imagesArray.push(
      this.fb.group({
        url: ['', Validators.required],
        altText: ['', Validators.required],
      })
    );
  }

  createProduct(productId: string): void {
    if (!productId) {
      const productData = this.productForm.value;
      const sellerID = '609c2227b6bd730022fcec33';
      console.table(productData);
      this.sellerService.createProduct(sellerID, productData).subscribe(
        (response: any) => {
          console.log('Product created successfully:', response);
          // Optionally, you can reset the form after successful creation
          this.productForm.reset();
        },
        (error: any) => {
          console.error('Error creating product:', error);
        }
      );
    } else {
      const productData = this.productForm.value;
      const sellerID = '609c2227b6bd730022fcec33';
      console.table(productData);
      this.sellerService.updateProductBySellerId(productId, sellerID, productData).subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          // Optionally, you can reset the form after successful creation
          this.productForm.reset();
        },
        (error: any) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
