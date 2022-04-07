import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  imageFile;
  constructor( private router:Router, private authService: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.productForm = new FormGroup({
      productName: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    });
  }

  imageChange(event){
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      this.imageFile= event.target.files[0];
    }
  }

  submit() {
    console.log('Form Submitted..', this.productForm.value);
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('productName', this.productForm.value.productName);
    formData.append('image',  this.imageFile);
    formData.append('price', this.productForm.value.price);

    this.productService.addProduct(formData).subscribe(res => {
      console.log(res);
      // alert('Uploaded Successfully.');
      this.router.navigate(['admin/products']);
    })
  }

  // logout() {
  //   localStorage.removeItem('accessToken');
  //   this.router.navigate(["/login"]);
  // }

}
