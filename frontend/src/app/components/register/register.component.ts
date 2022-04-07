import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  // errorMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.registerForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(''),
    });
  }

  get emailError() {
    return this.registerForm.get('email');
  }

  submit() {
    console.log('Form Submitted..', this.registerForm.value);
    // if (this.registerForm.invalid) {
    //   return;
    // }
    // const { userName, email, password } = this.registerForm.value;
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        console.log("Data", data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        // this.errorMessage = err.error;
        this.isSignUpFailed = true;
      }
    );
  }

}
