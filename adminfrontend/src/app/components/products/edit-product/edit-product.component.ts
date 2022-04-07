import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm:FormGroup;
  id:number;
  imageFile;
  file:any;
  imageName:string;
  imgPath:string;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
        productName: new FormControl(''),
        image: new FormControl('',[Validators.required]),
        price: new FormControl('')
    });

    this.id = this.route.snapshot.params['id'];
    console.log(this.id );
    this.productService.getId(this.id).subscribe((data) => {
      console.log('data in edit form id:',data['image']);
      this.imgPath = data['image'];
      this.productForm = new FormGroup({
        productName: new FormControl(data['productName']),
        image: new FormControl(this.imgPath),
        price: new FormControl(data['price'])
      });
    });
  }

  get fileInput(){
    return this.productForm.get('image');
  }

  imageChange(event){
    // console.log(event.target.files);
    if (event.target.files.length > 0) {
      // this.imageFile= event.target.files[0];
      // // this.imgPath=this.imageFile;
      // console.log('Change image:',this.imageFile);
      // console.log(this.imageFile.name);

      const file = (event.target as HTMLInputElement).files[0];
      this.productForm.patchValue({
        image: file
      });
      this.productForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageFile = reader.result as string;

        console.log(this.imageFile);
      }
      reader.readAsDataURL(file);

      // console.log(this.file);
      // return file;
      // let reader = new FileReader();
      // reader.onload = (event: any) => {
      //   this.imageFile = event.target.result;
      //   console.log(this.imageFile);
      // }
      // reader.readAsDataURL(event.target.files[0]);

    }
  }

   submit() {
    console.log('Form Edited..', this.productForm.value);
     // console.log('set in form data',this.file);
     if(!this.imageFile){
       console.log(this.imgPath);
     }
     const formData = new FormData();
     formData.append('productName', this.productForm.value.productName);
     formData.append('image',  this.productForm.value.image);
     formData.append('price', this.productForm.value.price);

    this.productService.editProduct(this.id,formData ).subscribe(
      (result) => {
        console.log("Updated Successfully..",result);
        this.router.navigate(['admin/products']);
      },(err)=>{
        console.log('not update');
     }
    )
  }

 }
