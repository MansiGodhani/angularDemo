import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user";
import jwt_decode from "jwt-decode";
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public adminSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http:HttpClient, private router:Router) {
    const adminToken = localStorage.getItem('adminToken');

    if(adminToken){
      this.adminSubject.next(jwt_decode(adminToken));
    }
  }

  loginAdmin(email, password) {
    return this.http.post<{token: string}>(baseUrl + 'api/auth/login', { email, password })
      .pipe(
        map(result => {
          console.log('admin token', result);
          console.log(result['adminToken']);
          localStorage.setItem('adminToken', result['adminToken']);
          console.log('data',jwt_decode(result['adminToken']));
          // let data =jwt_decode(result['adminToken']);
          // console.log(data['isRole'])
          // if(data['isRole']=="ADMIN"){
          //   this.router.navigate(['/admin']);
          // }
          // if(result['adminToken']) {
          //   this.adminSubject.next(jwt_decode(result['adminToken']));
          // }
          return true;
        })
      );
  }

  // //check expire time and logout
  // isTokenExpired(){
  //   //expire time in backend
  //   const expiry = (JSON.parse(atob(localStorage.getItem('adminToken').split('.')[1]))).exp;
  //   if ((Math.floor((new Date).getTime() / 1000)) >= expiry)
  //   {
  //     this.isAdminLouOut();
  //     console.log('Admin token is expire! Login Again..');
  //     alert('Login Again..');
  //   }
  //   return true;
  // }

  isCheckAdmin(){
    const adminToken = localStorage.getItem('adminToken');
    console.log(adminToken);
    this.router.navigate(['/dashboard']);
  }

  isAdminLoggedIn(){
    return localStorage.getItem('adminToken');
  }

  isAdminLouOut(){
    localStorage.removeItem('adminToken');
    this.router.navigate(['']);
  }

}

