import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginSubscription: Subscription = null;
  formData = new FormData();
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private settingsService: SettingsService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.formData.append('username', null);
    this.formData.append('pass', null);
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
    this.formData.set('username', this.loginForm.get('username').value);
    this.formData.set('pass', this.loginForm.get('pass').value);
    this.loginSubscription = this.usersService.login(this.formData)
      .pipe(catchError((err) => {
        throw err;
      }))
      .subscribe((res: any)=>{
        this.settingsService.token = res.data;
        let formData = new FormData();
        formData.append("token", this.settingsService.token);
        this.usersService.getMyUserFromAPI(formData)
            .pipe(catchError((err) => {
              throw err;
            }))
            .subscribe(
              (user: any)=>
              {
                this.settingsService.user = user.data;
                this.settingsService.user.ID = Number(this.settingsService.user.ID);
                this.usersService.getMyUserImageFromAPI(formData)
                  .pipe(catchError((err) => {
                    throw err;
                  }))
                  .subscribe((img)=>
                  {
                    this.settingsService.user.userImage = img;
                    this.router.navigate(['']);
                  }
                    
                  );
                
              }
            );
      })
  }
  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}



