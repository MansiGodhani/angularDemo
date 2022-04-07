import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;

  constructor(
    private modalService: NgbModal,
    private router:Router,
    private authService: AuthService,
    private productService:ProductService ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productService.getProductList().subscribe((data)=>{
      console.log(data);
      this.products = data;
    })
  }

  //edit product
  updateProduct(id){
    console.log(id);
    // console.log(product.image['image']);
    this.productService.getId(id).subscribe((data) => {
      console.log('Data',data);
      this.router.navigate([`admin/products/editProduct/${id}`]);
    });
  }

  deleteProduct(content, id){
    // console.log("delete Product id", id);
    this.modalService.open(content).result.then((result) => {
      console.log('click yes for delete',result);
      this.productService.deleteProduct(id).subscribe(res=>{
        this.getProductList();
        console.log(res);
      })
    }, (err) => {
      console.log('Error', err);
    });
  }

}
