import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

<<<<<<< Updated upstream
  constructor() { }
=======
  show: boolean = true; // Variable to control form visibility
  blog:Blog=new Blog()
  blogs?: Blog[];
  constructor(private blogService: BlogService){}

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
>>>>>>> Stashed changes

  ngOnInit(): void {
  }

}
