import { Blog } from './../model/Blog';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BlogRepository } from "../repository/BlogRepository";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn:'root'
})

export class BlogService{
  // private apiUrl = 'your-api-url';


constructor(private blogRepository:BlogRepository,private http: HttpClient){}
blogs?:Blog[]

getAllBlogs():Observable<Blog[]>{
 return this.blogRepository.getAllBlogs()

  }

  saveBlog(blog: Blog) {
    // Implement the logic to save the blog to the API
    return this.blogRepository.saveBlog(blog)
  }
}
