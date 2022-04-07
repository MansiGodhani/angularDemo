import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    if(this.authService.isAdminLoggedIn()){
      return true;
    }
    // alert("Your Are not Logged In");
    this.authService.logout();
    return false;
  }

}
