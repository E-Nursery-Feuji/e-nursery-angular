import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwttokenService } from '../services/jwttoken.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username:string=""
  role:string=''

  constructor(private router:Router,private jwttokenservice:JwttokenService) { }

  ngOnInit(): void {
    this.username=this.jwttokenservice.getFirstNameFromToken();
    this.role=this.jwttokenservice.getRoleFromJwtToken();
    console.log(this.role)
  }

  // for logout
  logout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/home")
  }

}
