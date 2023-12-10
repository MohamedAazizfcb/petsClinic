import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginSubscription: Subscription = null;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = new FormGroup(
      {
        username: new FormControl(''),
        pass: new FormControl(''),
      }
    );
  }

  submit(){

    this.usersService.login(this.loginForm.value)
      .pipe(catchError((err) => {
        throw err;
      }))
      .subscribe((res)=>{
        this.router.navigate(['auth','login']);
      })
  }
  openSignup(){
    this.router.navigate(['auth','signup']);
  }
  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}



