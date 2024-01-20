import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service';

import { environment } from 'src/environments/environment';
import { LoginData, LoginResponse, ProfileData, RegisterData } from '../models/auth-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _baseUrl = environment.baseUrl;
  private _authUrl = environment.authUrl;
  private _catalogueUrl = environment.catalogueUrl;
  private _categoriesUrl = environment.categoriesUrl;
  private _subCatgeoriesUrl = environment.subCategoriesUrl;
  private _searchUrl = environment.searchUrl;
  private _sellerURL = environment.sellerURL;

  constructor(private http: HttpClient) { }
  /** Auth Service */
  facebookLogin = new RestService(this.http, `${this._baseUrl}${this._authUrl}facebook`);
  googleLogin = new RestService(this.http, `${this._baseUrl}${this._authUrl}google`);
  getProfile = new RestService<ProfileData>(this.http, `${this._baseUrl}${this._authUrl}profile`);
  register = new RestService<LoginResponse, RegisterData>(this.http, `${this._baseUrl}${this._authUrl}register`);
  login = new RestService<LoginResponse, LoginData>(this.http, `${this._baseUrl}${this._authUrl}login`);
  
  /** Catalogue Service */
  getAllProducts = new RestService<any[]>(this.http, `${this._baseUrl}${this._catalogueUrl}`);
  getProductById = new RestService(this.http, `${this._baseUrl}${this._catalogueUrl}:id`);
  getCategories = new RestService(this.http, `${this._baseUrl}${this._categoriesUrl}`);
  getSubCategories = new RestService(this.http, `${this._baseUrl}${this._subCatgeoriesUrl}`);
  
  /** Search Service */
  search = new RestService<any[]>(this.http, `${this._baseUrl}${this._searchUrl}`);

  /** Seller products service */
  getAllSellerProducts = (sellerId: string) =>
    new RestService<any[]>(this.http, `${this._baseUrl}${this._sellerURL}/${sellerId}`);
  getSellerOneProduct = (productId: string, sellerId: string) =>
    new RestService<any>(this.http, `${this._baseUrl}${this._sellerURL}/${sellerId}/${productId}`);
  createSellerProduct = (sellerId: string) =>
    new RestService<any>(this.http, `${this._baseUrl}${this._sellerURL}/${sellerId}`);
  updateSellerProduct = (productId: string, sellerId: string, productData: any) =>
    new RestService<any>(this.http, `${this._baseUrl}${this._sellerURL}/${sellerId}/${productId}`);
  deleteSellerProduct = (productId: string, sellerId: string) =>
    new RestService<any>(this.http, `${this._baseUrl}${this._sellerURL}/${sellerId}/${productId}`);
}
