import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // public cartItemList:any = [];
  // public productList = new BehaviorSubject<any>([]);

  constructor( private http:HttpClient) { }

  addCart(product){
    console.log('add to db',product);
    return this.http.post(baseUrl + 'api/carts/add',product);
  }

  getProducts(userId){
    return this.http.get(`${baseUrl}api/carts/list/${userId}`);
  }

  removeCartItem(id) {
    return this.http.delete(baseUrl + `api/carts/delete/${id}`);
  }

  emptyCart(userId) {
    return this.http.delete(baseUrl + `api/carts/allDelete/${userId}`);
  }

  editCartItem(id,item) {
    return this.http.put(baseUrl + `api/carts/editCart/${id}`,item);
  }

}
