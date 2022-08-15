import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('currentUser')){
      return true
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    
    //   const isAuth = this.authService.getIsAuth();
    // if(!isAuth){
    //   this.router.navigate(['/login']);
    // }
    // return isAuth;
  }
  
}
