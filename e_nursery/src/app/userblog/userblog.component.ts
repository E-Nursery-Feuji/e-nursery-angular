import { Component, OnInit } from '@angular/core';
import { Blog } from '../model/Blog';
import { Image } from '../model/image';
import { BlogService } from '../services/BlogService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  showReadMore:boolean = false;

  //-------------------------------------
  show: boolean = true; // Variable to control form visibility
  blogs: Blog[]=[];
  images:Image[]=[];
  file?:any
  picture:any
  openedBlogId: number | null = null;
  constructor(private blogService: BlogService,private formBuilder: FormBuilder)
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
    this.submitted=false;
    this.formShow=!(this.formShow);
  }

  //for open the blog modal
  blogModal(blog:Blog)
  {
    this.blog=blog;
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
    this.submitted=true;
    if (this.blogForm.invalid) {
      return;
    }
    if(this.blogForm.valid)
    {
      this.blog=this.blogForm.value
      this.blog.status="InActive"
      this.blogService.saveBlogImage(this.blog,this.file)

    }
  }


  onFileChange(event:any){
    this.file=event.target.files[0]

  }


}
