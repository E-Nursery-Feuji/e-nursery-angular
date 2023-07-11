import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/Blog';
import { Image } from '../model/image';
import { BlogService } from '../services/BlogService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwttokenService } from '../services/jwttoken.service';

@Component({
  selector: 'app-userblog',
  templateUrl: './userblog.component.html',
  styleUrls: ['./userblog.component.css']
})
export class UserblogComponent implements OnInit {

  formShow:boolean=false;
  blogShow:boolean=false;
  blogForm: FormGroup;
  submitted:boolean=false;
  blog:Blog=new Blog();
  image:Image=new Image();
  showReadMore:boolean = false;

  //-------------------------------------
  show: boolean = true; // Variable to control form visibility
  blogs: Blog[]=[];
  images:Image[]=[];
  file?:any
  picture:any
  openedBlogId: number | null = null;
  constructor(private blogService: BlogService,private formBuilder: FormBuilder,
              private jwtTokenService:JwttokenService)
  {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  ngOnInit() {
 }


  // -----------------------------------------------------------------
  // for open the form modal
  formModal()
  {
    this.blog=new Blog();
    this.submitted=false;
    this.formShow=!(this.formShow);
  }

  //for open the blog modal
  blogModal(blog:Blog)
  {
    this.blog=blog;
    this.image=this.getImages().filter(i=>i.id==blog.image_id)[0];
    this.blogShow=!(this.blogShow);
  }

  //for gett all images
  getImages(){
    this.images=this.blogService.getImages();
    return this.images;
  }

  //for get the active blogs only
  getActiveBlogs()
  {
    this.blogs=this.blogService.getActiveBlogs();
    return this.blogs;
  }


  //for save the blog
  submitForm()
  {
    console.log(this.blog);
    this. blog = {
      "id":0,
      "title": this.blog.title,
      "uploaded_by": this.jwtTokenService.getFirstNameFromToken()+" "+this.jwtTokenService.getLastNameFromJwtToken(),
      "description": this.blog.description,
      "status": "InActive",
      //"image": { "id": 0, "image": this.blog.image }
    };
    // this.file=this.blog.image

    console.log(this.file);
    this.blogService.saveBlogImage(this.blog,this.file)
    this.blog=new Blog()
    this.file=null
    this.formModal();
  }


  onFileChange(event:any){
    this.file=event.target.files[0]

  }


}
