import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList:any;
  // istureactive:any;
  // isNotActive:any;
  constructor( private authService:AuthService ) { }

  ngOnInit(): void {
    this.getAllUser();
    // this.checkActive();
    // this.authService.isActiveCheck();
  }

  getAllUser() {
    // console.log('user list');
    this.authService.getUser().subscribe((data) => {
      console.log('userList', data);
      this.userList = data;
      // console.log(this.userList.isActive);
    });
  }

}
