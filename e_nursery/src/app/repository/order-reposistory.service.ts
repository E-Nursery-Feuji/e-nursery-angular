import { Injectable } from '@angular/core';

import { Cart } from '../model/cart';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderReposistoryService {

  baseUrl:string='http://localhost:8000/orders/';

constructor(private http:HttpClient) { }

addToCart(cart:Cart):Observable<object>{
  console.log(cart)
 return this.http.post<object>(this.baseUrl+"savecart/",cart);
}

}
