import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //  Users
  //Add user
  addUser(users: FormData) {
    return this.http.post(baseUrl + 'api/users/addUser', users);
  }

  //edit user
  editUser(id,user){
    return this.http.put(baseUrl + `api/users/editUser/${id}`,user);
  }

  //delete user
  deleteUser(id){
    return this.http.delete(baseUrl + `api/users/deleteUser/${id}`);
  }

  //get id
  getId(id){
    return this.http.get(baseUrl + `api/users/id/${id}`);
  }

  //  get all user api
  getUser(){
    return this.http.get(baseUrl + 'api/users/list');
  }

  //  get total user api
  getTotalUser(){
    return this.http.get(baseUrl + 'api/users/totalUsers');
  }

  getTotalActiveUser(){
    return this.http.get(baseUrl + 'api/users/totalActiveUsers');
  }

  getTotalInActiveUser(){
    return this.http.get(baseUrl + 'api/users/totalInActiveUsers');
  }

}
