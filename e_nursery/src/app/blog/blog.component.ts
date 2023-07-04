import { Image } from './../model/image';
import { Blog } from './../model/Blog';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/BlogService';
import Swal from 'sweetalert2';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl:'./blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  // blogForm!: FormGroup;

  show: boolean = true; // Variable to control form visibility
  blog:Blog=new Blog()




  blogs?: Blog[];


  constructor(private blogService: BlogService){}
  // private formBuilder: FormBuilder) {
  //   this.blogForm = this.formBuilder.group({
  //     title: ['', Validators.required],
  //     uploaded_by: ['', Validators.required],
  //     description: ['', Validators.required],
  //     status: ['', Validators.required],
  //     image: ['', Validators.required]
  //   });

  saveBlog() {
    console.log(this.blog);
    let blog = {
      "title": this.blog.title,
      "uploaded_by": this.blog.uploaded_by,
      "description": this.blog.description,
      "status": "active",
      "image": { "id": 0, "image": this.blog.image }
    };

    console.log("locAL BLOG "+blog);

    this.blogService.saveBlog(blog).subscribe(savedBlog => {

      console.log('Blog saved:', savedBlog);
      // Clear the form and refresh the blog list
      let message = savedBlog
      Swal.fire({
        title: 'Confirmation',
        text: message,
        icon: 'success'
        // showCancelButton: true,
        // confirmButtonText: 'Yes,  it!',
        // cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (!result.isConfirmed) {
          // Delete operation
          Swal.fire('Cancelled', 'The operation was cancelled', 'error');
        }
      });

      this.getBlogs();
    });
  }


  ngOnInit() {
    this.getBlogs();

  }

  getBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      console.log(data);
      this.blogs = data;

      // Iterate over each blog in the array
      this.blogs.forEach(blog => {
        let imageLink: string = blog.image!.image; // Access the image property of each blog
        imageLink = imageLink.substring(2, imageLink.length - 1);
        blog.image!.image = imageLink;
        console.log("Image link: " + imageLink);
      });
      console.log("from compo ", this.blogs);
    });
  }

  openDialog() {
    console.log("click");
    this.show = !this.show; // Toggle the value of showForm variable
  }
}
