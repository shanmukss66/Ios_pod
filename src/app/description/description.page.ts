import { Component, OnInit } from '@angular/core';
import { TokenResponse } from '../models/TokenResponse.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceDescriptionResolver } from '../services/InvoiceDescriptionResolver.service';
import { InvoiceHeaderDetail } from '../models/InvoiceHeaderDetail.model';
import { InvoiceItemDetail } from '../models/InvoiceItemDetail.model';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  userdetails:TokenResponse = new TokenResponse();
  invoicedetails:InvoiceHeaderDetail=new InvoiceHeaderDetail();
  description_data:InvoiceItemDetail = new InvoiceItemDetail();
  constructor( private router:Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.invoicedetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('header_id'));
    
    this.activatedRoute.data.subscribe((x :{descrptn:any})=>{
      console.log(x.descrptn);
      this.description_data=x.descrptn;
      
     })
  }

}
