import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { TokenResponse } from '../models/TokenResponse.model';
import { GetService } from './getservice.service';

@Injectable({
    providedIn:'root'
})
export class OnTimeAndLateInvResolver{
    userdetails:TokenResponse=new TokenResponse();
constructor(private getservice: GetService){

}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.userdetails=JSON.parse(route.paramMap.get('user_data'));
    console.log(this.userdetails);
    
    return forkJoin([this.getservice.getOnTimeDeliveryInvoices(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole,"","","","",""),this.getservice.getLateDeliveryInvoices(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole,"","","","","")])
}



}