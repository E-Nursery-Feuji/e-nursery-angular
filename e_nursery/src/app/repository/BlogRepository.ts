import { Blog } from './../model/Blog';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Image } from '../model/image';



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

  getImages():Observable<Image[]>
  {
    return this.http.get<Image[]>(this.baseUrl+"images/")
  }


  saveBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.baseUrl+"saveblog/",blog);


}

saveImage(imageData:any):Observable<any>{
  return this.http.post<any>(this.baseUrl+"saveImage/",imageData)
}


updateStatus(id:number):Observable<Blog>{
  return this.http.patch<Blog>(`${this.baseUrl}updatestatus/${id}/`,{});
  }
}
