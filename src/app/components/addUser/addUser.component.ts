import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Subscription, catchError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  formData: FormData = new FormData();
  fileName = "";
  signSubscription: Subscription = null;
  accountTypes = [
    {id: 0, val:"Please select account type"},
    {id: 1, val:"Admin"},
    {id: 2, val:"Employee"},
    {id: 3, val:"Client"}
  ];

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(DOCUMENT) public document: Document
  ){}

  ngOnInit(): void {
    this.formData.append('username', null);
    this.formData.append('email', null);
    this.formData.append('pass', null);
    this.formData.append('fullname', null);
    this.formData.append('imageData', null);
    this.formData.append('accountType', null);
    this.initializeForm();
  }

  initializeForm(){
    this.signupForm = new FormGroup(
      {
        username: new FormControl('',Validators.required),
        email: new FormControl('',Validators.required),
        pass: new FormControl('',Validators.required),
        fullname: new FormControl('',Validators.required),
        accountType: new FormControl(0,Validators.required),
      }
    );
  }

  onFileSelected(event: any) {
    (event as HTMLInputElement).files[0];
    let f = event.files.item(0);
    this.formData.set('imageData', f);
    this.fileName = f.name;
  }

  submit(){
    this.formData.set('username', this.signupForm.get('username').value);
    this.formData.set('email', this.signupForm.get('email').value);
    this.formData.set('pass', this.signupForm.get('pass').value);
    this.formData.set('fullname', this.signupForm.get('fullname').value);
    this.formData.set('accountType', this.signupForm.get('accountType').value);
    this.signSubscription = this.usersService.signup(this.formData)
      .pipe(catchError((err) => {
        throw err;
      }))
      .subscribe((res)=>{
        this.router.navigate(['auth','login']);
      })
  }
  ngOnDestroy(): void {
    this.signSubscription?.unsubscribe();
  }
}
