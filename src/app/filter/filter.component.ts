import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Platform } from '@ionic/angular';

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
  hidestatus=false;
  temphide="no"
  filterdata:FormData = new FormData();
  constructor(private dialogRef: MatDialogRef<FilterComponent>,private paltform:Platform,@Inject(MAT_DIALOG_DATA) data) {
    this.userRole=data.x,
    this.temphide=data.hidestatus
    this.paltform.backButton.subscribe(()=>{
      this.dialogRef.close(null)
    })
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
    if(this.status ==null){
      if(this.start_date == null){
        if(this.end_date == null) {
          if(this.invoice_number == null){
            if(this.customer_name == null) {
              if(this.plant==null){
                this.flag = "no";
              } 
            }
          }
        }
      }
    }
    this.filterdata.append('status',this.status);
    console.log(this.status);
    
    this.filterdata.append('start_date',this.start_date);
    this.filterdata.append('end_date',this.end_date);
    this.filterdata.append('invoice_number',this.invoice_number);
    this.filterdata.append('plant',this.plant)
    this.filterdata.append('CustomerName',this.customer_name);
    this.filterdata.append('flag',this.flag);
    this.dialogRef.close(this.filterdata);
  }

}
