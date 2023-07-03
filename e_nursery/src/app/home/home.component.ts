import { Router } from '@angular/router';
import { JwttokenService } from './../services/jwttoken.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin:boolean=false;

  constructor(private jwttokenService:JwttokenService,private router:Router) {

   }

  ngOnInit(): void {

    this.isLogin=this.jwttokenService.isLoginned();

  }

  toggleLogin(){
    if(this.isLogin){
      localStorage.removeItem('token');
      this.router.navigateByUrl("home");
      this.isLogin=false;
    }else{
      this.router.navigateByUrl("login");
    }
  }

}
