import { Component, OnInit } from '@angular/core';
import{Http}from '@angular/http';


//import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/toPromise';
//import { toPromise, delay } from 'rxjs/operators';
import {ServiceService}from'./../service.service';
import { product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:Http,private service:ServiceService) { }
  product:product[]=[];
  msg="sundarm";
  id:number;
  purl="http://localhost:5555/products"
  private headers=new Headers({'content-type':'application/json'});
  ngOnInit() {
    this.fetchdata();
  
  }

  fetchdata():any{
   this.service.get().subscribe((res=>{
   this.product=res;
   console.log(this.product);
   error=>console.log(<any>error);
   }))
  }
  Delete(productlist:product){
    console.log(productlist.id);
    confirm("Are u sure u want to delete the operation");
   /*//const url=`$("http://localhost:5555/products")/${id}`;
   return this.http.delete(url)
      .pipe(toPromise()).then(()=>{
     this.fetchdata();
      });
    }*/
    this.service.Delete(productlist).subscribe((res)=>{
      
      //this.fetchdata();
      console.log(res);
      this.removePlayerFromList(productlist)
      error=>console.log(<any>error);
      
    })

  }
   
  private removePlayerFromList(productlist: product) {
    var index = this.product.indexOf(productlist, 0);
    console.log(index);
  
    if (index > -1) {
        this.product.splice(index, 1);
    }
  }



      }
