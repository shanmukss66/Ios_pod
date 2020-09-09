import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, empty, of } from 'rxjs';
import { take, mergeMap, catchError, filter, retry } from 'rxjs/operators'
import { DeliveryCount } from '../models/DeliveryCount.model';
import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
import { InvoiceUpdation1 } from '../models/InvoiceUpdation1.model';
import { InvoiceUpdation } from '../models/InvoiceUpdation.model';
import { DataService } from './BehaviourSubject.service';

import { ToastController } from '@ionic/angular';
import { ToastMaker } from '../Toast/ToastMaker.service';
import { ChangePassword } from '../models/ChangePassword.model';
import { ForgotPasswordOTP } from '../models/ForgotPasswordOTP.model';

@Injectable({
    providedIn:"root"
})

export class GetService{
  
   baseUrl="http://210.212.229.104:8001";
 constructor(private http:HttpClient,private dataservice:DataService, private route:ActivatedRoute,private toast:ToastMaker){

  
 }

 loginResponse(data:string):Observable<any>{
    
      return this.http.post<any>(this.baseUrl+"/token" ,data).pipe(
        retry(5),
        
        
        
      );

 }
 changePassword(data:ChangePassword){
  return this.http.post<any>(this.baseUrl+"/api/Master/ChangePassword" ,data).pipe(
    retry(5),
    
    
    
  );
 }

 handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    
    if(error.status==0){
      this.toast.internetConnection();
    }
    else{
      this.toast.wentWrong();
    }

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}



 getItemQuanttity(x:number):Observable<any>{

  return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetItemQuantityCountByID?ID="+x).pipe(
    retry(5),
    
  );
 }

 

 deliverychart(usercode:string,userid:string,role:string):Observable<any>
 {
   if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/GetDeliveryCountByUser?UserCode="+usercode).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    )
    
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/GetDeliveryCount?UserID="+userid).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    )
    ;
   }
   
 }

 

 

 invoicechart(usercode:string,userid:string,role:string):Observable<any>{
   if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/GetInvoiceStatusCountByUser?UserCode="+usercode).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/GetInvoiceStatusCount?UserID="+userid).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
 }

 getApprovedInvoice(data:string,userid:string,role:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetConfirmedInvoiceDetailByUser?UserCode="+data).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetConfirmedInvoiceDetails?UserID="+userid).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );;
   }
 }

 getPendingInvoice(data:string,userid:string,role:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetOpenAndSavedInvoiceDetailByUser?UserCode="+data).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetOpenAndSavedInvoiceDetails?UserID="+userid).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
   }
 }

 getPartiallyConfirmedInvoice(data:string,userid:string,role:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterPartiallyConfirmedInvoicesByUser?UserCode="+data+"&StartDate=&EndDate=").pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterPartiallyConfirmedInvoices?UserID="+userid+"&Organization=&Division=&Plant=&StartDate=&EndDate").pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
   }
 }

 getItemDescription(username:string,userid:string,role:string,headerid:string):Observable<any>{
   if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetInvoiceItemDetailsByUserAndID?UserCode="+username+"&ID="+headerid).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetInvoiceItemDetailsByID?UserID="+userid+"&ID="+headerid).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   
 }


 confirmInvoiceItems(data:InvoiceUpdation1):Observable<any>{
   return this.http.post<any>(this.baseUrl+"/api/PODConfirmation/ConfirmInvoiceItems" , data).pipe(
    retry(5),
    
  );
 }

 updateInvoiceItems(data:InvoiceUpdation):Observable<any>{
  return this.http.post<any>(this.baseUrl+"/api/PODConfirmation/UpdateInvoiceItems" , data).pipe(
    retry(5),
    
  );
 }


 addInvoiceAttachment(data:FormData){
  return this.http.post<any>(this.baseUrl+"/api/PODConfirmation/AddInvoiceAttachment" , data).pipe(
    retry(5),
    
  );
 }


 getFilteredInvoice(username:string,status:string,sdate:string,edate:string,inumber:string,custname:string,plant:string,userID:string,userRole:string):Observable<any>{
   if(userRole == "Customer"){
     
     
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/FilterInvoiceDetailByUser?UserCode="+username+"&Status="+status+"&StartDate="+sdate+"&EndDate="+edate+"&InvoiceNumber="+inumber).pipe(
      retry(5),
      
    );;
   }
   else{
     
     
     
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/FilterInvoiceDetail?UserID="+userID+"&Status="+status+"&StartDate="+sdate+"&EndDate="+edate+"&InvoiceNumber="+inumber+"&Plant="+plant+"&CustomerName="+custname).pipe(
      retry(5),
      
    );;
   }
    
 }
 sendEmailforOTP(data:string):Observable<any>{
  return this.http.get<any>(this.baseUrl+"/api/Master/SendOTPToMail?EmailAddress="+data).pipe(
    retry(5),
    
  );
 }

changePasswordUsingOTP(data:ForgotPasswordOTP):Observable<any>{
  return this.http.post<any>(this.baseUrl+"/api/Master/ChangePasswordUsingOTP",data).pipe(
    retry(5)
  )
}

}


