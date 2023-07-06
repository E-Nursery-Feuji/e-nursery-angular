import { Blog } from './../model/Blog';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BlogRepository } from "../repository/BlogRepository";
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { Image } from '../model/image';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn:'root'
})

export class BlogService{
  // private apiUrl = 'your-api-url';


constructor(private blogRepository:BlogRepository,private http: HttpClient,private router:Router){}
blogs?:Blog[]

getAllBlogs():Observable<Blog[]>{
 return this.blogRepository.getAllBlogs()

  }
  getImages():Observable<Image[]>{
    return this.blogRepository.getImages()

     }


  saveBlogImage(blog: Blog,image:any) {
    const imageData= new FormData()
    imageData.append('image',image,image.name);
    // Implement the logic to save the blog to the API
    return this.blogRepository.saveImage(imageData).subscribe(data=>{
      blog.image_id=data.id
      this.saveBlog(blog)
      console.log("bbbbbbbbbbb")
      console.log(blog)
       this.router.navigateByUrl("admin/blog");
    })

  }
  saveBlog(blog:Blog){
    this.blogRepository.saveBlog(blog).subscribe(data=>{
      console.log(data)
      Swal.fire({
        icon:'success',
        text:'blog saved successfully..'
      })
     })
  }

  updateStatus(id:number){
    return this.blogRepository.updateStatus(id);
  }
}

