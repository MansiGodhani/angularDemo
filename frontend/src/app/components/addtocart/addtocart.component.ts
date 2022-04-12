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
  paymentHandler: any = null;
  paymentMsg: boolean=false;

  constructor( private modalService:NgbModal,private cartService: CartService, private router:Router ) { }

  ngOnInit(): void {
    this.getCartItem();
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KnHLxSHb8jy5iNwmH7oDbhblooOCmMRKa36eO3ETISQuinUtk0G5gB4DprBya4uIy4KidRoDxEdjeqfMJ6258CA00Ynyibl6z',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        if(stripeToken){
          this.emptyCart();
          // alert('Payment Successfully.');
          this.paymentMsg = true;
        }
      },
    });
    paymentHandler.open({
      name: 'Check Out',
      description: this.totalItem + 'items',
      amount: amount * 100,
      address_city:'India',
      email: (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1]))).email,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KnHLxSHb8jy5iNwmH7oDbhblooOCmMRKa36eO3ETISQuinUtk0G5gB4DprBya4uIy4KidRoDxEdjeqfMJ6258CA00Ynyibl6z',
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            alert('Payment has been SuccessFull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  getDetails(){
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    this.cartService.getProducts(userId).subscribe(res=> {
      this.products = res;
      console.log('this product', this.products);
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

  emptyCart(){
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    this.cartService.emptyCart(userId).subscribe(res=> {
      console.log('delete all items',res);
      this.getDetails();
      this.totalItem = res['length'];
      this.grandTotal = 0;
      this.discount=0;
      this.cartTotal=0;
    });
  };

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
        this.cartTotal=0;
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
    // console.log(item.qty);
    if(item.qty>1){
      item.qty -=1;
    }
    this.cartService.editCartItem(item._id,item).subscribe(res=>{
      // console.log(res);
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
    // console.log(item._id);
    item.qty += 1;
    this.cartService.editCartItem(item._id,item).subscribe(res=>{
      // console.log(res);
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
