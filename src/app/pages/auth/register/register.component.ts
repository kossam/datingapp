import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private router: Router, private accountService: AccountService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.toastrService.success("Success, You have been Registered")
      this.router.navigateByUrl('/login')
    }, error => {
      this.toastrService.error(error.error)
      console.log(error);
    })
    console.log(this.model);
  }

}
