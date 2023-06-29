import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerRepository {

  baseUrl:string='http://localhost:8000/customer/';

  constructor(private http:HttpClient)
  {

  }

  //for save the customer
  saveCustomer(customer:Customer):Observable<Customer>
  {
    return this.http.post<Customer>(this.baseUrl+"save/",customer); //api call for save
  }

  //for login
  login(login_data:object) :Observable<object>
  {
    return this.http.post<object>(this.baseUrl+"signin/",login_data); //api call for login
  }

  //for send mail
  sendEmail(emailData:object):Observable<any>
  {
    return this.http.post<any>(this.baseUrl+"forgotpasswordotp/",emailData);
  }
}
