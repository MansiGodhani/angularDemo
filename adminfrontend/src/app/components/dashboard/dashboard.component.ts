import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin:any;
  totalUser:any;
  totalActiveUser:any;
  totalInActiveUser:any;
  totalProducts:any;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    // this.authService.isTokenExpired();
    this.authService.adminSubject.subscribe(res=>{
      this.admin= res;
    });
    this.getTotalUser();
    this.getTotalActiveUser();
    this.getTotalInActiveUser();
    this.getTotalProduct();
  }

  logout(){
    this.authService.isAdminLouOut();
  }

  //user service
  getTotalUser(){
    this.userService.getTotalUser().subscribe(res=>{
      // console.log(res);
      this.totalUser = res;
    });
  }

  getTotalActiveUser(){
    this.userService.getTotalActiveUser().subscribe(res=>{
      this.totalActiveUser = res;
    })
  }

  getTotalInActiveUser(){
    this.userService.getTotalInActiveUser().subscribe(res=>{
      this.totalInActiveUser = res;
    })
  }

  //product service
  getTotalProduct(){
    this.productService.getTotalProduct().subscribe(res=>{
      this.totalProducts = res;
    })
  }

}
