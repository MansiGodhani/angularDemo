import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItem:number=0;
  constructor(private cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    const userId = (JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])))._id;
    this.cartService.getProducts(userId).subscribe(res=>{
      console.log(res);
      this.totalItem = res['length'];
    })
  }

}
