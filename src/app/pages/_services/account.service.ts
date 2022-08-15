import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isAuthenticated = false;

  baseUrl = 'https://localhost:7021/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model)
      .pipe(map((response: User) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // return user;
        const user = response;
        console.log(user)
        if (user) {
          this.isAuthenticated = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

        const jwtToken = JSON.parse(atob(response.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now();
        setTimeout(() => this.logout(), timeout);

      })
      )
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model)
    .pipe(map((user: any) =>{
        if(user){
          //notification service
          this.router.navigate(['/login']);
        }
    }))
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user)
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSource.next(null!);
    this.router.navigate(['/login']);
  }
}
