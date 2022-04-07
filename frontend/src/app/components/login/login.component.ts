import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading:boolean = false;
  submitted: boolean = false;
  errorMessage: string ="";
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
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
  get email() {
    return this.loginForm.get('email');
  }

  submit() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          console.log('login called');
          this.authService.isCheckUSer();
          this.isSignUpFailed = false;
          // this.router.navigate(['/home']);
        },
        error: error => {
          this.errorMessage = error;
          this.isSignUpFailed = true;
          this.loading = false;
        }
      });
  }
}
