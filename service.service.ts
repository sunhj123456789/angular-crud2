import { Injectable } from '@angular/core';
import {person} from './models/person';
import{Observable,BehaviorSubject, observable} from'rxjs';
import {map} from "rxjs/operators";
import{Http,Headers,Response} from '@angular/http';
import { get } from 'selenium-webdriver/http';
import {product}from './model/product';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url="http://localhost:5555/products";
  private header=new Headers({'Content-Type':'application/json'});
  //url=`$("http://localhost:5555/products")/${id}`;
  //person:person[]=[];
  //data:person;
  id:number;
  productobj:object;
  constructor(private http:Http) { }

  get():Observable<product[]>
  {
    let url1="http://localhost:5555/products";
    //return this.http.get(url1).map(res=>res.json()).catch(this.handleError());
    return this.http.get(url1)
                        .map(response => response.json() as product[])
                        .catch(this.handleError);
  }
 
 
  Delete(productlist:product):Observable<any>{
  let updateurl=`${this.url}/${productlist.id}`;
  console.log(updateurl)  
  console.log(productlist.id);
  /*return this.http.delete(this.url +"/" +productlist.id).pipe(map(res=>{
    res.json();
  }));*/
  return this.http.delete(updateurl).map(this.sucess).catch(this.handleError);
 }


 post(product):Observable<any>{
  console.log(product);
    //console.log(this.id);
  return this.http.post(this.url,product,{headers:this.header}).pipe(map(res=>{
   res.json();
 }));
}

 update(product):Observable<any>{
   console.log(product);
   console.log(this.url+"/"+product.id);
   this.id=product.id;
   console.log(this.id);
   return this.http.put((this.url + "/" + this.id),product,{headers:this.header}).pipe(map(res=>{
    res.json();
  }));
 }

 


private handleError(res:Response):Observable<any>{
  //console.log(res.status);
  let errormsg= `${res.status} -${res.statusText}`;
  return Observable.throw(errormsg);
}

private sucess():Observable<any>{
  return Observable.create();
}


 }

/*private handleError(error:Response|any){
console.log(error.message || error);
return Observable.throw(error.status);
//private msg = new BehaviorSubject<person[]>(null);
  current=this.msg.asObservable();

  save(data):void{ 
  
  /// this.person.push(this.data);
   //console.log(this.person);
   this.msg.next(data);
 }

 get():Observable<person[]>{
   return this.current;
 }

}*/


