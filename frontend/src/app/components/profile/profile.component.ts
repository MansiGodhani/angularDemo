import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  editForm:FormGroup;
  id:number;
  imageFile;
  file:any;
  imgPath:string;
  updateProfile:boolean=false;

  constructor( private authService:AuthService,private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(res => {
      // console.log('user ',res);
      this.user = res;
      // console.log(res);
    });
    this.authService.isTokenExpired();
    this.editForm = new FormGroup({
      profileImg: new FormControl('',[Validators.required]),
    });
    this.userService.getId(this.user._id).subscribe((data) => {
      this.imgPath = data['profileImg'];
      this.editForm = new FormGroup({
        profileImg: new FormControl(this.imgPath),
      });
    });
  }

  get fileInput(){
    return this.editForm.get('profileImg');
  }

  imageChange(event){
    // console.log(event.target.files);
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      this.editForm.patchValue({
        profileImg: file
      });
      this.editForm.get('profileImg').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageFile = reader.result as string;
        // console.log(this.imageFile);
      }
      reader.readAsDataURL(file);
    }
  }

  submit() {
    console.log('Form Edited..', this.editForm.value);
    const formData = new FormData();
    formData.append('profileImg', this.editForm.value.profileImg);
    this.userService.editProfile(this.user._id,formData).subscribe(
      (result) => {
        console.log("Updated Successfully..");
        this.updateProfile=true;
        // this.router.navigate(['profile']);
      },(err)=>{
        console.log('not update');
      }
    )
  }

  changePassword(){
    this.router.navigate(['users/setting']);
  }

  logout() {
    this.authService.logout();
  }
}
