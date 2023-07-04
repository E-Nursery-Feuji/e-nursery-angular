import { Blog } from './../model/Blog';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
  providedIn:'root'
})
export class BlogRepository


{
  constructor(private http:HttpClient){

  }

  baseUrl:string="http://127.0.0.1:8000/products/"

  getAllBlogs():Observable<Blog[]>{
   return this.http.get<Blog[]>(this.baseUrl+"blogs")
  }

  // saveBlog(blog: Blog): Observable<Blog> {
  //   return this.http.post<Blog>(this.baseUrl+"saveblog")
  // }

  saveBlog(blog: Blog): Observable<string> {
    return this.http.post<string>(this.baseUrl + "saveblog/", blog);
  }


}
