import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { Type } from '../model/type';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {

  baseUrl:string='http://localhost:8000/products/';

  constructor(private http:HttpClient)
  {

  }

  //foe get types
  getTypes()
  {
    return this.http.get<Type>(this.baseUrl+"types/");
  }

  //for save Image
  saveImage(imageData:any):Observable<any>
  {
    return this.http.post<any>(this.baseUrl+"saveImage/",imageData);
  }
  //for save the product
  saveProduct(product:Product):Observable<Product>
  {
    return this.http.post<Product>(this.baseUrl+"saveproduct/",product); //api call for save
  }

  //for update the product
  updateProduct(product :Product):Observable<Product>
  {
    return this.http.put<Product>(this.baseUrl+"updateproduct/",product)
  }

  // for getting products
  getProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.baseUrl+"products/");
  }

  //deleting product
  deleteProduct(id : number)
  {
    return this.http.delete<Product>(`${this.baseUrl}deleteproduct/${id}/`)
  }

  //for getting the images
  getImages():Observable<Image[]>
  {
    return this.http.get<Image[]>(this.baseUrl+"images/");
  }

}
