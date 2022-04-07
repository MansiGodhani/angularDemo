import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {
  totalItem:any;
  products:any=[];
  grandTotal:number = 0;
  cartTotal:number=0;
  total:number=0;
  shippingCharge=50.00;
  discount:number=0;
  savedMoney:number=0;

  constructor( private modalService:NgbModal,private cartService: CartService, private router:Router ) { }

  ngOnInit(): void {
    this.getCartItem();
  }

  getDetails(){
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    this.cartService.getProducts(userId).subscribe(res=> {
      this.products = res;
      console.log('this product', this.products);
      // this.totalItem = res['length'];
    });
    }

  getCartItem(){
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    this.cartService.getProducts(userId).subscribe(res=>{
      this.products = res;
      console.log('this product',this.products);
      this.totalItem = res['length'];

      for(let i = 0; i < this.products.length; i++){
        this.grandTotal += parseInt(this.products[i].productId.price) * this.products[i].qty;
      }
      this.discount = (this.grandTotal *10) / 100;

      if(this.grandTotal>0){
        this.cartTotal = this.grandTotal - this.discount + this.shippingCharge;
        this.savedMoney = this.grandTotal - this.cartTotal;
        if(this.savedMoney < 0){
          this.savedMoney = 0;
        }
      }
    });
  }

  removeCartItem(content,id){
    // console.log('content',content);
    this.modalService.open(content).result.then((result) => {
      console.log('result',result);

      this.cartService.removeCartItem(id).subscribe(res=>{
        console.log('remove',res,id);
        // window.location.reload();
        this.products = this.products.filter(item => !(item._id == id))
        console.log(this.products);
        this.grandTotal = 0;
        this.discount=0;
        this.totalItem = this.products['length'];
        for(let i=0; i< this.products.length;i++){
          this.grandTotal += parseInt(this.products[i].productId.price) * this.products[i].qty;
        }

        this.discount = (this.grandTotal *10) / 100;
        if(this.grandTotal>0){
          this.cartTotal = this.grandTotal - this.discount + this.shippingCharge;
          this.savedMoney = this.grandTotal - this.cartTotal;
          if(this.savedMoney < 0){
            this.savedMoney = 0;
          }
        }
      });
    }, (err) => {
      console.log('Error', err);
    });
  }

  //decrement & update item quantity
  dec(item){
    console.log(item._id);
    if(item.qty>0){
      item.qty -=1;
    }
    this.cartService.editCartItem(item._id,item).subscribe(res=>{
      console.log(res);
      this.grandTotal = 0;
      this.discount=0;
      this.totalItem = this.products['length'];
      for(let i=0; i< this.products.length;i++){
        this.grandTotal += parseInt(this.products[i].productId.price) * this.products[i].qty;
      }

      this.discount = (this.grandTotal *10) / 100;
      if(this.grandTotal>0){
        this.cartTotal = this.grandTotal - this.discount + this.shippingCharge;
        this.savedMoney = this.grandTotal - this.cartTotal;
        if(this.savedMoney < 0){
          this.savedMoney = 0;
        }
      }
    });

  }

  //increment & update item quantity
  inc(item){
    // console.log(item.qty);
    console.log(item._id);
    item.qty +=1;
    this.cartService.editCartItem(item._id,item).subscribe(res=>{
      console.log(res);
      this.grandTotal = 0;
      this.discount=0;
      this.totalItem = this.products['length'];
      for(let i=0; i< this.products.length;i++){
        this.grandTotal += parseInt(this.products[i].productId.price) * this.products[i].qty;
      }

      this.discount = (this.grandTotal *10) / 100;
      if(this.grandTotal>0){
        this.cartTotal = this.grandTotal - this.discount + this.shippingCharge;
        this.savedMoney = this.grandTotal - this.cartTotal;
        if(this.savedMoney < 0){
          this.savedMoney = 0;
        }
      }
    })
  }
}
