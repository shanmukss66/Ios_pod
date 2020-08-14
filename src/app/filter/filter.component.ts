import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  status:string="";
  start_date:string="";
  end_date:string="";
  invoice_number:string="";
  LR_number:string="";
  flag = "yes";
  filterdata:FormData = new FormData();
  constructor(private dialogRef: MatDialogRef<FilterComponent>,@Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {}


  save(){
    if(this.status ==null){
      if(this.start_date == null){
        if(this.end_date == null) {
          if(this.invoice_number == null){
            if(this.LR_number == null) {
               this.flag = "no";
            }
          }
        }
      }
    }
    this.filterdata.append('status',this.status);
    this.filterdata.append('start_date',this.start_date);
    this.filterdata.append('end_date',this.end_date);
    this.filterdata.append('invoice_number',this.invoice_number);
    this.filterdata.append('LR_number',this.LR_number);
    this.filterdata.append('flag',this.flag);
    this.dialogRef.close(this.filterdata);
  }

}
