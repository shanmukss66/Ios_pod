import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Platform, ModalController, NavParams } from '@ionic/angular';
import { FilterParam } from '../models/FilterParam.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  status:string="";
  start_date:string="";
  end_date:string="";
  customer_name:string="";
  invoice_number:string="";
  plant:string="";
  flag = "yes";
  userRole="";
  hideforCustomer=true;
 @Input()  hidestatus=false;
 @Input() temphide="no"
 @Input() segment :number
  filterdata:FilterParam = new FilterParam();
  constructor(private modalCtrl:ModalController,private navPrams:NavParams) {
    this.userRole=this.navPrams.get('usr_role'),
    this.temphide=this.navPrams.get('hide_status')
    this.segment=this.navPrams.get('segment')
   }

  ngOnInit() {
    if(this.userRole=="Customer"){
      this.hideforCustomer=true;

    }else{

      this.hideforCustomer=false;
    }
    if(this.temphide=="no"){
      this.hidestatus=false
    }else{
      this.hidestatus=true
    }

    

  }


  save(){
    if(this.status=="" && this.segment==1){
      this.status="PartiallyConfirmed"

    }
    if(this.status=="" && this.segment==2){
      this.status="Confirmed"

    }
   
   
    this.filterdata.status=this.status;
    this.filterdata.invno= this.invoice_number;
    this.filterdata.plant=this.plant;
    this.filterdata.stdate=this.start_date;
    this.filterdata.enddate=this.end_date;
    this.filterdata.customername=this.customer_name;
    this.modalCtrl.dismiss(this.filterdata);
  }

}
