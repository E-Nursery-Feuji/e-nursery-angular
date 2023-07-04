import { Image } from './../model/image';
import { Blog } from './../model/Blog';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/BlogService';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl:'./blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  // blogForm!: FormGroup;

  show: boolean = true; // Variable to control form visibility
  blogs?: Blog[];
  newBlog: Blog = {
    title: '',
    uploaded_by: '',
    description: '',
    status: '',
    image:undefined
  };

  constructor(private blogService: BlogService){}
  // private formBuilder: FormBuilder) {
  //   this.blogForm = this.formBuilder.group({
  //     title: ['', Validators.required],
  //     uploaded_by: ['', Validators.required],
  //     description: ['', Validators.required],
  //     status: ['', Validators.required],
  //     image: ['', Validators.required]
  //   });


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

  // saveBlog() {
  //   this.blogService.saveBlog(this.newBlog).subscribe(savedBlog => {
  //     console.log('Blog saved:', savedBlog);
  //     // Clear the form and refresh the blog list
  //     this.newBlog = {
  //       title: '',
  //       uploaded_by: '',
  //       description: '',
  //       status: '',
  //       // image: ''
  //     };
  //     this.getBlogs();
  //   });
  }



  // onSubmit() {
  //   if (this.blogForm.valid) {
  //     // Access form values
  //     const formData = this.blogForm.value;

  //     // Perform further actions like saving the blog data
  //     console.log(formData);

  //     // Reset the form after saving the data
  //     this.blogForm.reset();
  //     this.showForm = false; // Hide the form
  //   }
  // }
// }
