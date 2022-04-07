import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  products: any;
  carts:any;
  added:any;
  itemExists: number[] = [];

  constructor(private authService: AuthService, private productService: ProductService, private cartService:CartService, private router:Router) {
  }

  ngOnInit(): void {
    this.authService.isTokenExpired();
    this.authService.userSubject.subscribe(res => {
      this.user = res;
    });
    this.getProductList();
    //SET Add button or view button
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    this.cartService.getProducts(userId).subscribe(res=> {
      this.carts = res;
      for(let i=0;i<this.carts.length;i++){
      if (this.carts[i].productId._id && !this.itemExists.includes(this.carts[i].productId._id)) {
        this.itemExists.push(this.carts[i].productId._id);
        }
      }
      console.log(this.itemExists);
    });
  }

  logout() {
    console.log(this.user.email);
    this.authService.isLogout(this.user.email)
      .subscribe({
        next: () => {
          console.log('log out called');
          this.authService.logout();
        },
        error: error => {
          console.log(error);
        }
      });
    console.log('logout ');
  }

  /*product list*/
  getProductList(){
    this.productService.getProductList().subscribe((data)=>{
      console.log(data);
      this.products = data;
    });
  }

  /* Add To Cart */
  addToCart(productId){
    // console.log('add to cart id',productId);
    const qty = 1;
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    console.log(userId);
    const payload = {userId, productId, qty }
    this.cartService.addCart(payload).subscribe(result => {
      console.log('result', result);
      this.router.navigate(['/addToCart']);
    });
  }

  viewCart(){
    this.router.navigate(['/addToCart']);
  }

}
