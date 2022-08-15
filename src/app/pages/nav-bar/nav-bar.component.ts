import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav,} from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@UntilDestroy()
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  model: any = {};
  loggedIn: boolean = false;

  constructor(private observer: BreakpointObserver, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    }, error => {
      console.log(error);
      this.loggedIn;
    })
    console.log(this.model);
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('currentUser')!);
    this.accountService.setCurrentUser(user);
  }


  logout(){
    this.loggedIn;
    this.accountService.logout();
    this.router.navigate(['/login'])
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user =>{
      this.model = user;
      this.loggedIn = !!user;
    })
  }


}
