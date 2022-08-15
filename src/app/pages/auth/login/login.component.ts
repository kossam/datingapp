import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  isAuthenticated: boolean = false;
  constructor(private router: Router, private accountService: AccountService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    // this.setCurrentUser();
  }
  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.toastrService.success("Successful");
      this.isAuthenticated = true;
      this.router.navigate(['/landingpage']);
      this.setCurrentUser();
    }, error => {
      console.log(error);
      this.toastrService.error(error.error);
    })
    console.log(this.model);
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('currentUser')!);
    this.accountService.setCurrentUser(user);
  }


}
