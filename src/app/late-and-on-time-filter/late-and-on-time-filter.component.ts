import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FilterDataForOnTimeAndLate } from '../models/FilterDataForOnTimeAndLate.model';

@Component({
  selector: 'app-late-and-on-time-filter',
  templateUrl: './late-and-on-time-filter.component.html',
  styleUrls: ['./late-and-on-time-filter.component.scss'],
})
export class LateAndOnTimeFilterComponent implements OnInit {
  @Input() userRole:string;
  organization="";
  division ="";
  plant ="";
  st_date="";
  end_date="";
  hideforCustomer=true;
  fileterdata:FilterDataForOnTimeAndLate = new FilterDataForOnTimeAndLate();
  constructor(private modalCtrl:ModalController,private navPrams:NavParams) {
     this.userRole = this.navPrams.get('usr_role'); 
    if(this.userRole!="Customer"){
      this.hideforCustomer=false;
    }
   }
  
  ngOnInit() {}


  save(){
    this.fileterdata.organization=this.organization;
    this.fileterdata.division=this.division;
    this.fileterdata.plant=this.plant;
    this.fileterdata.st_date=this.st_date;
    this.fileterdata.end_date=this.end_date;
    this.modalCtrl.dismiss(this.fileterdata);
  }

}
