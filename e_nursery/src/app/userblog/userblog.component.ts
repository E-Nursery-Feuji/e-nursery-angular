import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/Blog';
import { Image } from '../model/image';
import { BlogService } from '../services/BlogService';

@Component({
  selector: 'app-userblog',
  templateUrl: './userblog.component.html',
  styleUrls: ['./userblog.component.css']
})
export class UserblogComponent implements OnInit {


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
  }

  onFileChange(event:any){
    this.file=event.target.files[0]

  }
  openDialog() {
    console.log("click");
    this.show = !this.show; // Toggle the value of showForm variable
  }

  ngOnInit() {
     this.getAllBlogs();
     this.getImages();
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
