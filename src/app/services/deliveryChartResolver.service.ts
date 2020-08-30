import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Observable, empty, of, forkJoin } from 'rxjs';
import { GetService } from 'src/app/services/getservice.service';

import { take, mergeMap, catchError, filter, retry, map } from 'rxjs/operators'

import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
import { TokenResponse } from '../models/TokenResponse.model';
import { DeliveryCount } from '../models/DeliveryCount.model';
import { StorageService } from './storage.service';
import { Plugins } from '@capacitor/core';
import { delAndInv } from '../models/delAndInv.model';
import { async } from '@angular/core/testing';
import { promise } from 'protractor';
@Injectable({
  providedIn: "root"
})
export class DeliveryResolver {
  userdetails: TokenResponse = new TokenResponse();
  response: TokenResponse = new TokenResponse();
   j : delAndInv = new delAndInv();
  constructor(private getservice: GetService, private route: ActivatedRoute, private storage: StorageService) {
 
 
  
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.userdetails = JSON.parse(route.paramMap.get('user_data'));
    // let temp = async () =>{
    //   this.response =  await JSON.parse((await Plugins.Storage.get({key:'signedUser'})).value)
    //   console.log((this.response));
    //   // return await Promise.resolve(this.response).then(() => undefined) 
    //   return await Promise.all([this.response]);
    // }
    // console.log(temp());
    
    
    // console.log(this.getservice.deliverychart(this.userdetails.userName, this.userdetails.userID, this.userdetails.userRole));

    // let del = Observable.create((x) => {
    //   (this.getservice.deliverychart(this.response.userName,this.response.userID,this.response.userRole).subscribe((y: DeliveryCount) => {
    //     x.next(y);
    //   }))

    // })
    // let inv = Observable.create((z) => {
    //   (this.getservice.invoicechart(this.response.userName,this.response.userID,this.response.userRole).subscribe((y: InvoiceStatusCount) => {
    //     z.next(y);
    //   }))

    // })
    
  //  let tot = Observable.create((l)=>{
  //   del.subscribe((x:any)=>{
  //     inv.subscribe((y:any)=>{
  //      l.next(forkJoin([x,y]))
  //     })
  //  })
    
  //  tot.subscribe((m:any)=>{
  //    console.log(m);
     
  //  })

  

    //   return ob;

    // return Observable.create((data) => {
    //   this.storage.getObject('signedUser').then((y: any) => {
    //     this.response = y;
    //     console.log(this.response);
    //     data.next(forkJoin([this.getservice.deliverychart(this.response.userName,this.response.userID,this.response.userRole),this.getservice.invoicechart(this.response.userName,this.response.userID,this.response.userRole)]))
    //     this.getservice.deliverychart(this.response.userName,this.response.userID,this.response.userRole).subscribe((x:DeliveryCount)=>{
    //       this.getservice.invoicechart(this.response.userName,this.response.userID,this.response.userRole).subscribe((m:InvoiceStatusCount)=>{
     
    //      this.j.del=x;
    //       this.j.inv = m;
    //        console.log(this.j);
           
    //         data.next(this.j);
    //       })
    //     })
      
      
    //   })

    // })






        // data.next(forkJoin([this.getservice.deliverychart(this.response.userName,this.response.userID,this.response.userRole),this.getservice.invoicechart(this.response.userName,this.response.userID,this.response.userRole)]))
        //   console.log();
        //   data.complete();

    

       return forkJoin([this.getservice.deliverychart(this.userdetails.userName,this.userdetails.userID,this.userdetails.userRole),this.getservice.invoicechart(this.userdetails.userName,this.userdetails.userID,this.userdetails.userRole)])  




  }

  getpart():Observable<any>{
    return Observable.create((data) => {
      this.storage.getObject('signedUser').then((y: any) => {
        this.response = y;
        console.log(this.response);
        // data.next(forkJoin([this.getservice.deliverychart(this.response.userName,this.response.userID,this.response.userRole),this.getservice.invoicechart(this.response.userName,this.response.userID,this.response.userRole)]))
        this.getservice.deliverychart(this.response.userName,this.response.userID,this.response.userRole).subscribe((x:DeliveryCount)=>{
          this.getservice.invoicechart(this.response.userName,this.response.userID,this.response.userRole).subscribe((m:InvoiceStatusCount)=>{
           
          //  let k : FormData = new FormData();
          //  k.append('del',JSON.stringify(x));
          //  console.log(JSON.parse(JSON.parse(k.get('del').toString())));
           
          //  k.append('inv',JSON.stringify(m));

         
         this.j.del=x;
          this.j.inv = m;
          this.j.tok= y;
           console.log(this.j);
           
            data.next(this.j)
          })
        })
        })

      })

  }


 

}