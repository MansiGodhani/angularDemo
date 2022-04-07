import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean = false;
  submitted: boolean = false;
  errorMessage: string ="";
  isSignUpFailed: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initialize();

    // if(this.authService.verifyLogged()){
    //   this.router.navigate(['home']);
    // }
  }

  initialize(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(''),
    });
  }

  submit() {
    console.log(this.loginForm.value);
    // if(this.loginForm.value.email !== 'admin@gmail.com' && this.loginForm.value.password !== '123'){
    //   console.log('not valid email & password');
    // }else{
    //   console.log('valid');
    //   this.router.navigate(['/admin']);
    // }

    this.authService.loginAdmin(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          console.log('login called');
          this.authService.isCheckAdmin();
          this.isSignUpFailed = false;

          // this.router.navigate(['/admin']);
        },
        error: error => {
          this.errorMessage = error;
          this.isSignUpFailed = true;
          this.loading = false;
        }
      });
  }

}
