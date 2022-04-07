import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient ) { }

  getProductList(){
    return this.http.get(baseUrl + 'api/products/list');
  }

}
