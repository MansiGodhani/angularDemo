import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //get id
  getId(id){
    return this.http.get(baseUrl + `api/users/id/${id}`);
  }

  //edit profile
  editProfile(id,profileImg){
    // console.log('id',id,profileImg)
    return this.http.put(baseUrl + `api/users/editProfile/${id}`, profileImg);
  }

}
