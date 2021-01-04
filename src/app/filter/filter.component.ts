import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Platform, ModalController, NavParams } from '@ionic/angular';
import { FilterParam } from '../models/FilterParam.model';
import { PlantStructure } from '../models/PlantStruct.model';

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
  plant = new FormControl();
  flag = "yes";
  userRole="";
  hideforCustomer=true;
 @Input()  hidestatus=false;
 @Input() temphide="no"
 @Input() segment :number
 @Input() PlantList:PlantStructure[];
  filterdata:FilterParam = new FilterParam();
  constructor(private modalCtrl:ModalController,private navPrams:NavParams) {
    this.userRole=this.navPrams.get('usr_role'),
    this.temphide=this.navPrams.get('hide_status')
    this.segment=this.navPrams.get('segment')
    this.PlantList = this.navPrams.get('PlantList') as PlantStructure[]
    console.log(this.PlantList);
    
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

    this.plant.valueChanges.subscribe(f=>{
      console.log(f);
      
    })

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
    this.filterdata.plant=this.plant.value;
    this.filterdata.stdate=this.start_date;
    this.filterdata.enddate=this.end_date;
    this.filterdata.customername=this.customer_name;
    this.modalCtrl.dismiss(this.filterdata);
  }

}
