import { Injectable } from '@angular/core';
import { Router, CanActivate,CanDeactivate ,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './AuthService.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root'
})

export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((x)=>{
      this.auth.isAuthenticated().then((y)=>{
       if(y){
         this.router.navigate(['charts'])
       }
        x(y == false)
      })

     })
  }
  
}