import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList:any;
  users:any;
  constructor(
    private userService:UserService,
    private modalService: NgbModal,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    // console.log('user list');
    this.userService.getUser().subscribe((data) => {
      console.log('userList', data);
      this.userList = data;
      // console.log(this.userList.isActive);
    });
  }

  //edit user
  editUser(id){
    // console.log(id,c);
    this.userService.getId(id).subscribe((data) => {
      console.log(id,data);
      // this.users=user;
      // console.log('pass data',this.customers);
      this.router.navigate([`admin/users/editUser/${id}`]);
    });
  }

  //delete user
  deleteUser(content, id) {
    // console.log("delete Product id", id);
    this.modalService.open(content).result.then((result) => {
      console.log('click yes for delete', result);
      this.userService.deleteUser(id).subscribe(res=>{
        this.getAllUser();
        console.log(res);
      })
    }, (err) => {
      console.log('reason', err);
    });
  }

}
