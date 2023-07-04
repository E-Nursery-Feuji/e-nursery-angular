import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { JwttokenService } from '../services/jwttoken.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('underline', [
      state('inactive', style({
        borderBottomWidth: '0'
      })),
      state('active', style({
        borderBottomWidth: '2px'
      })),
      transition('inactive <=> active', animate('200ms ease-in-out'))
    ])
  ]
})


export class NavbarComponent implements OnInit {

  username:string=""
  role:string=''
  urlRole:string=''
  isActive: number | null = null;

  constructor(private router:Router,private jwttokenservice:JwttokenService,private activatedRoute:ActivatedRoute)
  {
    this.urlRole=this.activatedRoute.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.username=this.jwttokenservice.getFirstNameFromToken();
    this.role=this.jwttokenservice.getRoleFromJwtToken();
  }

  // for logout
  logout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/home")
  }

}
