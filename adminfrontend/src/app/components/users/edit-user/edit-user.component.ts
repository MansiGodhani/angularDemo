import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm:FormGroup;
  id:number;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      userName: new FormControl(''),
      email: new FormControl('')
    });

    this.id = this.route.snapshot.params['id'];
    this.userService.getId(this.id).subscribe((data) => {
      // this.customer=data;
      // console.log('data in edit form id:',this.customer);
      this.editForm = new FormGroup({
        id: new FormControl(data['id']),
        userName: new FormControl(data['userName']),
        email: new FormControl(data['email'])
      });
    });
  }

  submit() {
    // console.log('Form Editted..', this.editForm.value);
    this.userService.editUser(this.id, this.editForm.value).subscribe(
      (result) => {
        // console.log("Updated Successfully..",result);
        this.router.navigate(['admin/users'])
      }
    )
  }

}
