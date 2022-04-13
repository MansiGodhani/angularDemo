import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

const baseUrl='http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public adminSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(  private http: HttpClient, private router: Router ) {
    const accessToken = localStorage.getItem('accessToken');
    const adminToken = localStorage.getItem('adminToken');
    if(accessToken) {
      this.userSubject.next(jwt_decode(accessToken));
    }
    if(adminToken){
      this.adminSubject.next(jwt_decode(adminToken));
    }
  }

  register(user: User) {
    return this.http.post(baseUrl +'api/auth/register', user);
  }

  login(email, password) {
    return this.http.post<{token: string}>(baseUrl + 'api/auth/login', { email, password })
      .pipe(
        map(result => {
          console.log('token', result);
          // console.log(result['accessToken']);
          localStorage.setItem('accessToken', result['accessToken']);
          localStorage.setItem('status', 'true');
          // localStorage.setItem('adminToken', result['adminToken']);
          console.log('data',jwt_decode(result['accessToken']));
          this.router.navigate(['/home']);
          if(result['accessToken']) {
            this.userSubject.next(jwt_decode(result['accessToken']));
          }
          return true;

          // console.log(result['accessToken']);
          // console.log(result['adminToken']);
          // if(result['accessToken']){
          //   localStorage.setItem('accessToken', result['accessToken']);
          //   console.log('data',jwt_decode(result['accessToken']));
          //   this.userSubject.next(jwt_decode(result['accessToken']));
          //
          // }else if(result['adminToken']){
          //   localStorage.setItem('adminToken', result['adminToken']);
          //   console.log('data',jwt_decode(result['adminToken']));
          //   this.userSubject.next(jwt_decode(result['adminToken']));
          // }

        })
      );
  }

  //check expire time and logout
  isTokenExpired(){
    //expire time in backend
    const expiry = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1]))).exp;
    console.log(expiry);

    if ((Math.floor((new Date).getTime() / 1000)) >= expiry)
    {
      //set inactive status on expiry time.
      const email = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1]))).email;
      console.log(email);
      this.isLogout(email)
        .subscribe({
          next: () => {
            console.log('log out called');
            this.logout();
          },
          error: error => {
            console.log(error);
          }
        });
      console.log('token is expire! Login Again..');
      // alert('Login Again..');
    }
    return true;
  }

  isCheckUSer(){
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    this.router.navigate(['/home']);
  }

  isCheckAdmin(){
    const adminToken = localStorage.getItem('adminToken');
    console.log(adminToken);
    this.router.navigate(['/admin']);
  }

  isLogout(email){
    return this.http.put(baseUrl +'api/auth/logout',{email}).pipe(map(res=>{
      console.log('res logout',res);
    }));
  }

  logout() {
    localStorage.setItem('status','false');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
    // return this.http.put(baseUrl +'api/auth/logout',this.userSubject);
  }

  isLoggedIn(){
    return localStorage.getItem('accessToken');
  }

  isAdminLoggedIn(){
    return localStorage.getItem('adminToken');
  }

  loginAdmin(email, password) {
    return this.http.post<{token: string}>(baseUrl + 'api/auth/login', { email, password })
      .pipe(
        map(result => {
          console.log('admin token', result);
          console.log(result['adminToken']);
          localStorage.setItem('adminToken', result['adminToken']);
          console.log('data',jwt_decode(result['adminToken']));
          let data =jwt_decode(result['adminToken']);
          console.log(data['isRole'])
          if(data['isRole']=="ADMIN"){
            this.router.navigate(['/admin']);
          }
          if(result['adminToken']) {
            this.adminSubject.next(jwt_decode(result['adminToken']));
          }
          return true;
        })
      );
  }

  isAdminLouOut(){
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login/admin']);
  }

//  Users
//  get all user api
  getUser(){
    return this.http.get(baseUrl + 'api/users/list');
  }

  getTotalUser(){
    return this.http.get(baseUrl + 'api/users/totalUsers');
  }

}

