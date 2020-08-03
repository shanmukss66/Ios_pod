import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { take, mergeMap, catchError, filter } from 'rxjs/operators'
import { DeliveryCount } from '../models/DeliveryCount.model';
import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
@Injectable({
    providedIn:"root"
})

export class GetService{
  
 
 constructor(private http:HttpClient, private route:ActivatedRoute){

 }

 loginResponse(data:string):Observable<any>{
    return this.http.post<any>("http://210.212.229.104:8001/token" ,data);


 }

 

 deliverychart(data:string):Observable<any>
 {
   
   
   
   return this.http.get<any>("http://210.212.229.104:8001/api/Dashboard/GetDeliveryCountByUser?UserName="+data);
 

 
   
 }

 invoicechart(data:string):Observable<any>{
  return this.http.get<any>("http://210.212.229.104:8001/api/Dashboard/GetInvoiceStatusCountByUser?UserName="+data); ;
 }

 getApprovedInvoice(data:string):Observable<any>{
   return this.http.get<any>("http://210.212.229.104:8001/api/PODConfirmation/GetConfirmedInvoiceDetailByUser?UserName="+data);
 }

 getPendingInvoice(data:string):Observable<any>{
   return this.http.get<any>("http://210.212.229.104:8001/api/PODConfirmation/GetOpenAndSavedInvoiceDetailByUser?UserName="+data);
 }

 getItemDescription(username:string,headerid:string):Observable<any>{
   return this.http.get<any>("http://210.212.229.104:8001/api/PODConfirmation/GetInvoiceItemDetailsByUserAndID?UserName="+username+"&ID="+headerid);
 }

}