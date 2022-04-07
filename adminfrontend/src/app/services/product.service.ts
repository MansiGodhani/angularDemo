import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  //all product list
  getProductList(){
    return this.http.get(baseUrl + 'api/products/list');
  }

  //get id
  getId(id){
    return this.http.get(baseUrl + `api/products/id/${id}`);
  }

  //add product
  addProduct(products: FormData) {
    return this.http.post(baseUrl + 'api/products/addProducts', products)
  }

  //edit product
  editProduct(id,product){
    return this.http.put(baseUrl + `api/products/editProduct/${id}`,product);
  }

  //delete product
  deleteProduct(id){
    return this.http.delete(baseUrl + `api/products/delete/${id}`);
  }

  //product image
  image() {
    return this.http.get(baseUrl + 'uploads/' );
  }

  //total product
  getTotalProduct(){
    return this.http.get(baseUrl + 'api/products/totalProducts');
  }

}
