import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  admin:any;
  userList:any;
  totalUser:any;

  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.adminSubject.subscribe(res => {
      // console.log(res);
      this.admin = res;
    });

    // this.getAllUser();
    this.getTotaluser();
  }

  // getAllUser(){
  //   console.log('user list');
  //   this.authService.getUser().subscribe((data)=>{
  //     console.log(data);
  //     this.userList = data;
  //   });
  // }

  getTotaluser(){
    this.authService.getTotalUser().subscribe((data)=>{
      console.log(data);
      this.totalUser = data;
    })
  }

  logout(){
    this.authService.isAdminLouOut();
  }
}
