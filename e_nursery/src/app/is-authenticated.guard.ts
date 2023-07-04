import { JwttokenService } from './services/jwttoken.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private jwttokenService: JwttokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //for checking customer or admin is log-in or not
    if (this.jwttokenService.isLoginned()) {
      return true;
    } else {
      // Redirect to the login page if not login
      return this.router.navigate(['login']) ;
    }
  }
}

