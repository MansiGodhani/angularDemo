import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm:FormGroup;

  constructor( private router:Router, private userService: UserService ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.userForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    console.log('Form Submitted..', this.userForm.value);
    // if (this.userForm.invalid) {
    //   return;
    // }
    this.userService.addUser( this.userForm.value).subscribe((res) => {
      console.log(res);
      // alert('Uploaded Successfully.');
      this.router.navigate(['admin/users']);
    },(err)=>{
      console.log(err);

    })
  }

}
