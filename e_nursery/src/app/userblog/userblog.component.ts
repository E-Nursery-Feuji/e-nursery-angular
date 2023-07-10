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
  description:string="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nihil perspiciatis repellendus officiis voluptas voluptatum perferendis molestiae nesciunt quis a, unde minus? Voluptatibus alias ea impedit nostrum sunt! Voluptatem, excepturi!"+
  "Asperiores distinctio debitis, blanditiis vitae assumenda hic ullam rem dolor magni cum ipsa quos amet possimus, sint reprehenderit harum expedita doloremque, voluptatem neque. Quidem ipsum quibusdam debitis perferendis, sapiente aspernatur."+
  "Consequuntur aspernatur deleniti illum odit in similique accusantium commodi at dolore ex illo error quis possimus laborum adipisci iure soluta, eveniet a ullam magni eos earum ratione eaque nam. In!"+
  "Exercitationem aliquam culpa non, consequuntur unde labore dicta repellendus sed quod! Aperiam numquam vel blanditiis sed est. Fuga, assumenda similique, magni reprehenderit in neque fugiat vero aperiam, hic accusantium asperiores?"+
  "Alias, incidunt, blanditiis quam hic voluptate optio, ipsum tempora consectetur perferendis ea adipisci. Sed alias nesciunt qui adipisci nam quo doloribus? Officiis voluptatibus corporis veritatis necessitatibus, error provident nam quam.";
  showReadMore:boolean = false;

  //-------------------------------------
  show: boolean = true; // Variable to control form visibility
  blog:Blog=new Blog()
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
  blogModal()
  {
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
      this.blog=this.blogForm.value()
      this.blog.status=="Inactive"
      this.blogService.saveBlogImage(this.blog,this.file)

      //console.log(this.blog)
      console.log("Success")
    }
  }

  // -----------------------------------------------------------
  // saveBlog() {
  //   console.log(this.blog);
  //   this. blog = {
  //     "id":this.blog.id,
  //     "title": this.blog.title,
  //     "uploaded_by": this.blog.uploaded_by,
  //     "description": this.blog.description,
  //     "status": "InActive",
  //     //"image": { "id": 0, "image": this.blog.image }
  //   };
  //   // this.file=this.blog.image

  //   console.log(this.file);
  //   this.blogService.saveBlogImage(this.blog,this.file)
  // }

  onFileChange(event:any){
    this.file=event.target.files[0]

  }


}
