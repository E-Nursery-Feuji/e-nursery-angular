import { BlogRepository } from './../repository/BlogRepository';
import { Blog } from './../model/Blog';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { Image } from '../model/image';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductRepository } from '../repository/product-repository.service';

@Injectable({
  providedIn:'root'
})

export class BlogService{
  // private apiUrl = 'your-api-url';

  blogs:Blog[]=[];
  images:Image[]=[];

constructor(private blogRepository:BlogRepository,private router:Router,
            private productRepository:ProductRepository){
  this.blogRepository.getAllBlogs().subscribe(data =>{
    this.blogs=data;
 });

  this.productRepository.getImages().subscribe(data =>{this.images=data});
}

  //for all images
  getImages()
  {
    return this.images;
  }

  //for all the blogs
  getAllBlogs()
  {
    return this.blogs;
  }

  //for active blogs  only
  getActiveBlogs()
  {
    return this.blogs.filter(b=>b.status=='Active');
  }

//for save image of the blog
  saveBlogImage(blog: Blog,image:any) {
    const imageData= new FormData()
    imageData.append('image',image,image.name);
    // Implement the logic to save the blog to the API
    
    return this.blogRepository.saveImage(imageData).subscribe(data=>{
      blog.image_id=data.id

      blog.uploaded_by="raj"
      this.saveBlog(blog)
      console.log("bbbbbbbbbbb")
      console.log(blog)
       //this.router.navigateByUrl("admin/blog");
    })

  }

  //for save blog details
  saveBlog(blog:Blog){
    this.blogRepository.saveBlog(blog).subscribe(data=>{
      console.log(data)
      Swal.fire({
        icon:'success',
        text:'blog saved successfully..'
      })
     })
  }

  //for update the blog
  updateStatus(id:number){
   this.blogRepository.updateStatus(id).subscribe(data=>
    {
      const index = this.blogs.findIndex(b => b.id === id);
      if (index !== -1) {
        this.blogs[index] = data;
      }
    });
  }

}

