import {Resolve, ActivatedRouteSnapshot , RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {Injectable} from '@angular/core';
import { Observable, empty ,of, forkJoin } from 'rxjs';
import { GetService } from 'src/app/services/getservice.service';

import { take, mergeMap, catchError, filter, withLatestFrom } from 'rxjs/operators'

import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
import { TokenResponse } from '../models/TokenResponse.model';
import { DeliveryCount } from '../models/DeliveryCount.model';
@Injectable({
    providedIn:"root"
})
export class ApprovedInvoiceResolver{
userdetails:TokenResponse= new TokenResponse();
constructor(private getservice: GetService, private route: ActivatedRoute){


}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     this.userdetails=JSON.parse(route.paramMap.get('user_data'));
    
     
     
    return  forkJoin([this.getservice.getApprovedInvoice(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole),(this.getservice.getPartiallyConfirmedInvoice(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole)),(this.getservice.getPendingInvoice(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole))])
    
}


}