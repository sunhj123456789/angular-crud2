import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router}from '@angular/router';
import {Http,Headers}from '@angular/http';
import { ContentType } from '@angular/http/src/enums';
import{ServiceService }from'./../service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
   id:number;
  data:object;
  productobj:object;
  exist:boolean=false;
  product:any[]=[];
 //private header=new Headers({'ContentType':"application-json"});
  constructor(private http:Http,private route:ActivatedRoute,private router:Router,private service:ServiceService) { }

  ngOnInit() {
    this.route.params.subscribe((params=>{
      this.id=+params['id'];
      console.log(this.id);
    }));

    this.http.get("http://localhost:5555/products").subscribe
    ((res=>{
         this.product=res.json();
         console.log(this.product);
         
        for(let i=0;i<this.product.length;i++)
        {
              if(parseInt(this.product[i].id)===this.id)
              {
                this.exist=true;
                this.data=this.product[i];
                console.log(this.data);
                break;
              }
              else
              this.exist=false;
          }
        }));
 
  }


  submit(product){
  this.productobj={ "id":this.id, 
                    "name":product.name,
                    "color":product.color
    };
    this.service.update(this.productobj).subscribe(()=>{
            this.router.navigate(['/']);
    })
     }
    }
