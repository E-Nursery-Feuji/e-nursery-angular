import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRepository{

  baseUrl:string='http://localhost:8000/admin/';

  constructor(private http:HttpClient)
  {

  }

  //for save the admin
  saveAdmin(admin:Admin):Observable<Admin>
  {
    return this.http.post<Admin>(this.baseUrl+"saveadmin/",admin); //api call for save
  }

}
