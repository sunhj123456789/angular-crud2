import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import {ServiceService}from'./../service.service';
import {product}from './../model/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  data1:object={};
  productobj:object={};
  isadded:boolean=false;
  constructor(private http:Http,private service:ServiceService) { }

  ngOnInit() {
  }

  submit(product:any){
    console.log(product);
    this.productobj={
      "name":product.name,
      "color":product.color
    };
    
    console.log(this.productobj);
    /*this.post('http://localhost:5555/products',this.productobj).subscribe((res=>{
      //console.log(res);
     this.isadded=true;
    }))*/
     this.service.post(this.productobj).subscribe(()=>{
       this.isadded=true;
     })
     



  }

}
