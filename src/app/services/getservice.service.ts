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
import { FilterClass } from '../models/FilterClass.model';

@Injectable({
    providedIn:"root"
})

export class GetService{
  
    baseUrl="http://210.212.229.104:8001/";
  // baseUrl ="http://210.212.229.106:8090/"
   headers = new HttpHeaders({'Content-Type':'application/json'});
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

 getApprovedInvoice(data:string,userid:string,role:string,pgno:string,rc_cnt:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterConfirmedInvoicesByUser?UserCode="+data+"&StartDate=&EndDate=&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetConfirmedInvoiceDetails?UserID="+userid+"&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );;
   }
 }

 getPendingInvoice(data:string,userid:string,role:string,pgno:string,rc_cnt:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterPendingInvoicesByUser?UserCode="+data+"&StartDate=&EndDate=&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/GetOpenAndSavedInvoiceDetails?UserID="+userid+"&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
   }
 }

 getPartiallyConfirmedInvoice(data:string,userid:string,role:string,pgno:string,rc_cnt:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterPartiallyConfirmedInvoicesByUser?UserCode="+data+"&StartDate=&EndDate=&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterPartiallyConfirmedInvoices?UserID="+userid+"&Organization=&Division=&Plant=&StartDate=&EndDate="+"&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
   }
 }

 getLateDeliveryInvoices(data:string,userid:string,role:string,stdate:string,enddate:string,division:string,org:string,pgno:number,rc_cnt:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterLateDeliveryInvoicesByUser?UserCode="+data+"&StartDate="+stdate+"&EndDate="+enddate+"&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterLateDeliveryInvoices?UserID="+userid+"&Organization="+org+"&Division="+division+"&StartDate="+stdate+"&EndDate="+enddate).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
   }
 }

 getOnTimeDeliveryInvoices(data:string,userid:string,role:string,stdate:string,enddate:string,division:string,org:string,pgno:number,rc_cnt:string):Observable<any>{
  if(role=="Customer"){
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterOnTimeDeliveryInvoicesByUser?UserCode="+data+"&StartDate="+stdate+"&EndDate="+enddate+"&CurrentPage="+pgno+"&Records="+rc_cnt).pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
   }
   else{
    return this.http.get<any>(this.baseUrl+"/api/Dashboard/FilterOnTimeDeliveryInvoices?UserID="+userid+"&Organization="+org+"&Division="+division+"&StartDate="+stdate+"&EndDate="+enddate).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
   }
 }

// for Amararaja User
getPendingInvoicesforAMuser(fc:FilterClass):Observable<any>{
 console.log(fc);
 
  return this.http.post<any>(this.baseUrl+"api/Dashboard/FilterPendingInvoices",fc,{headers:this.headers}).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
}

getPartialInvoicesforAMuser(fc:FilterClass):Observable<any>{  

  return this.http.post<any>(this.baseUrl+"api/Dashboard/FilterPartiallyConfirmedInvoices",fc,{headers:this.headers}).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
}

getConfirmedInvoicesforAMuser(fc:FilterClass):Observable<any>{  

  return this.http.post<any>(this.baseUrl+"api/Dashboard/FilterConfirmedInvoices",fc,{headers:this.headers}).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
}


getLateInvoicesforAMuser(fc:FilterClass):Observable<any>{  

  return this.http.post<any>(this.baseUrl+"api/Dashboard/FilterLateDeliveryInvoices",fc).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
}
getOnTimeInvoicesforAMuser(fc:FilterClass):Observable<any>{  

  return this.http.post<any>(this.baseUrl+"api/Dashboard/FilterOnTimeDeliveryInvoices",fc).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
}

getFilteredInvoicesAMuser(fc:FilterClass,inv_cat):Observable<any>{

  return this.http.post<any>(this.baseUrl+"api/PODConfirmation/FilterInvoices",fc,{headers:this.headers}).pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
}

getPlantList():Observable<any>{
  return this.http.get<any>(this.baseUrl+"api/Master/GetAllPlants").pipe(

    
    retry(5),
    catchError(this.handleError<any>('getHeroes', []))
    
    );
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
  
 getDescriptionReasons(){
    return this.http.get<any>(this.baseUrl+"/api/Master/GetAllReasons").pipe(
      retry(5),
      catchError(this.handleError<any>('getHeroes', []))
    );
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


 getFilteredInvoiceForUser(usercode:string,status:string,sdate:string,edate:string,inumber:string,userRole:string):Observable<any>{
   if(userRole == "Customer"){
     
     
    return this.http.get<any>(this.baseUrl+"/api/PODConfirmation/FilterInvoiceDetailByUser?UserCode="+usercode+"&Status="+status+"&StartDate="+sdate+"&EndDate="+edate+"&InvoiceNumber="+inumber+"&CurrentPage=1&Records=500").pipe(
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


