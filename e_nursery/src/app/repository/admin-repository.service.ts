
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';


@Injectable({
  providedIn: 'root'
})

export class AdminRepository {

  baseUrl:string='http://localhost:8000/admin/';

  constructor(private http:HttpClient)
  {

  }


  //for save the customer

  saveAdmin(admin:Admin):Observable<Admin>
  {
    return this.http.post<Admin>(this.baseUrl+"saveadmin/",admin); //api call for save
  }

  getAdmin():Observable<Admin[]>{
    return this.http.get<Admin[]>(this.baseUrl+"admin/");
  }

  update(id:number,status:Admin):Observable<Admin>{
    return this.http.patch<Admin>(`${this.baseUrl}updateadmin/${id}/`,status);
  }

  updateStatus(id:number):Observable<Admin>{
    return this.http.patch<Admin>(`${this.baseUrl}updatestatus/${id}/`,{});
  }



}
