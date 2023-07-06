import { Image } from './../model/image';
import { Blog } from './../model/Blog';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/BlogService';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-blog',
  templateUrl:'./blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  show: boolean = true; // Variable to control form visibility
  blog:Blog=new Blog()
  blogs: Blog[]=[];
  images:Image[]=[];
  file?:any
  picture:any
  openedBlogId: number | null = null;
  constructor(private blogService: BlogService){}

  saveBlog() {
    console.log(this.blog);
    this. blog = {
      "id":this.blog.id,
      "title": this.blog.title,
      "uploaded_by": this.blog.uploaded_by,
      "description": this.blog.description,
      "status": "InActive",
      //"image": { "id": 0, "image": this.blog.image }
    };
    // this.file=this.blog.image

    console.log(this.file);
 this.blogService.saveBlogImage(this.blog,this.file)

    // this.blogService.saveBlog(blog).subscribe(savedBlog => {
    //   console.log('Blog saved:', savedBlog);
    //   // Clear the form and refresh the blog list
    //   let message = savedBlog
    //   Swal.fire({
    //     title: 'Confirmation',
    //     text: message,
    //     icon: 'success'
    //   })
    //   this.getBlogs();
    // });

  }
  onFileChange(event:any){
    this.file=event.target.files[0]

  }

  ngOnInit() {
     this.getAllBlogs();
     this.getImages();
  }
  openBlog(blog: any) {
    this.openedBlogId = blog.id;
  }
  closeBlog(blog: any) {
    this.openedBlogId = null;
  }
  toggleBlog(blog: any) {
    if (this.openedBlogId === blog.id) {
      this.openedBlogId = null;
    } else {
      this.openedBlogId = blog.id;
    }
  }
    // Function to check if a blog is currently opened
    isBlogOpened(blog: any): boolean {
      return this.openedBlogId === blog.id;
    }


    updatestatus(id:number) {
      console.log(id)

      this.blogService.updateStatus(id).subscribe((data) => {
        console.log(data)
        console.log('Status updated successfully.');
        this.getAllBlogs();
        this.getImages();

      });
    }




  // getBlogs() {
  //   this.blogService.getAllBlogs().subscribe(data => {
  //     console.log(data);
  //     this.blogs = data;

  //     // Iterate over each blog in the array
  //     this.blogs.forEach(blog => {
  //       // let imageLink: string = blog.image!.image; // Access the image property of each blog
  //       imageLink = imageLink.substring(2, imageLink.length - 1);
  //       blog.image!.image = imageLink;
  //       console.log("Image link: " + imageLink);
  //     });
  //     console.log("from compo ", this.blogs);
  //   });
  // }

  openDialog() {
    console.log("click");
    this.show = !this.show; // Toggle the value of showForm variable
  }

  getImages(){
    this.images=[];
    this.blogService.getImages().subscribe(data=>{
this.images=this.images?.concat(data)
console.log(data)
    })
  }

  getAllBlogs(){
    this.blogs=[];
    this.blogService.getAllBlogs().subscribe(data=>{
      this.blogs=this.blogs?.concat(data)
      console.log(data)
      console.log(this.blogs)
    })
  }
}
