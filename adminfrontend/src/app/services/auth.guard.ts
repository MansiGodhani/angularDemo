import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService:AuthService) {
  }

  canActivate(){
    if(this.authService.isAdminLoggedIn()){
      return true;
    }
    this.authService.isAdminLouOut();
    return false;
  }
}
