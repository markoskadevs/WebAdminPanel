import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Products } from '../models/products';
import { Settings } from '../models/setting';
import { Banners } from '../models/banners';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url  = environment.url;
 

  constructor(private http: HttpClient) { }

  saveNewCategory(category:Category){
    return this.http.post(this.url + 'public/category', category);
  }
  
  getAllCategory(language: any){
    let queryParams = {"language":language};
    return this.http.get(this.url + 'public/category', {params: queryParams});
  }

  removeCategory(id:any){
    return this.http.delete(this.url + 'public/category/'+id)
  }

  saveNewProducts(products : Products){
    return this.http.post(this.url + 'public/product', products );
  }

  getAllProducts(language: any){
    let queryParams = {"language":language};
    return this.http.get(this.url + 'public/product', {params: queryParams});
  }

  removeProduct(id:any){
    return this.http.delete(this.url + 'public/product/'+id)
  }
  saveSettings(settings : Settings){
    return this.http.post(this.url + 'public/settings', settings);
  }
  
  getAllSettings(language: any){
    let queryParams = {"language":language};
    return this.http.get<any>(this.url + 'public/settings', {params: queryParams});
  }

  subCategory(id:any){
    return this.http.get<any>(this.url + 'public/subcategory/' +id);
  }

  saveNewBanner(banners:Banners){
    return this.http.post(this.url + 'public/banner' , banners);
  }

  getAllBanners(){
    return this.http.get<any>(this.url + 'public/banner');
  }

  removeBanners(id:any){
    return this.http.delete(this.url + 'public/banner/'+id)
  }

  login(user:User){
    return this.http.post(this.url + 'public/login' , user);
  }

  updateBanner(id:any , banners:Banners){
    return this.http.post(this.url + 'public/update-banner/' +id , banners);
  }

  updateCategory(id:any , category : Category){
    return this.http.post(this.url + 'public/update-category/' +id , category);
  }

  updateProduct(id:any , product : Products){
    return this.http.post(this.url + 'public/update-product/' +id , product);
  }
}