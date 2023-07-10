import { JwttokenService } from './services/jwttoken.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private jwttokenService: JwttokenService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //checking the role from jwt and authorization
    if (this.jwttokenService.getRoleFromJwtToken().includes(route.data['role'])) {
      return true;
    }else if(route.data['role1'] == "ADMIN"){
      //admin can also acess the customer routers
      return true;
    }
    else {
      if (this.jwttokenService.getRoleFromJwtToken() === 'CUSTOMER') {
        // Redirect to the customer home page
        return this.router.navigate(['customer']);
      } else {
        // Redirect to a default page for other roles or unauthorized access
        return this.router.navigate(['login']);
      }
    }

  }
}
