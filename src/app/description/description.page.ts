import { Component, OnInit } from '@angular/core';
import { TokenResponse } from '../models/TokenResponse.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceDescriptionResolver } from '../services/InvoiceDescriptionResolver.service';
import { InvoiceHeaderDetail } from '../models/InvoiceHeaderDetail.model';
import { InvoiceItemDetail } from '../models/InvoiceItemDetail.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DescriptiondailogComponent } from '../descriptiondailog/descriptiondailog.component';
import { InvoiceUpdation } from '../models/InvoiceUpdation.model';
import { GetService } from '../services/getservice.service';
import { MenuController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  userdetails:TokenResponse = new TokenResponse();
  invoicedetails:InvoiceHeaderDetail=new InvoiceHeaderDetail();
  description_data:InvoiceItemDetail[];
  invoiceupdation:InvoiceUpdation = new InvoiceUpdation();
  cnfbtn_hidden=true;
  constructor( private router:Router,public popoverCtrl: PopoverController,public menuCtrl:MenuController,private getservice:GetService ,private activatedRoute: ActivatedRoute,private dialog:MatDialog) { 
    this.menuCtrl.enable(true, 'main-menu');
  }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.invoicedetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('header_id'));
    console.log(this.invoicedetails);
    
    console.log((this.activatedRoute.snapshot.paramMap.get('type')));
    
    if((this.activatedRoute.snapshot.paramMap.get('type'))=="pending"){
      this.cnfbtn_hidden=false;

    }
    else{
      this.cnfbtn_hidden=true;
    }
    this.activatedRoute.data.subscribe((x :{descrptn:InvoiceItemDetail[]})=>{
      console.log(x.descrptn);
      this.description_data=x.descrptn;
      
     })
  }

  openDailog(x:number){
    const dialogConfig = new MatDialogConfig();

    
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop=true;
    dialogConfig.data = {
      
      headerid: this.invoicedetails.HEADER_ID,
      createdby:this.invoicedetails.CREATED_BY
    };
    const dialogRef = this.dialog.open(DescriptiondailogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(

      data => {
        console.log("Dialog output:", data)
        
        if(data!=null){
          
          this.invoiceupdation.VEHICLE_REPORTED_DATE=new Date(data);
          this.invoiceupdation.InvoiceItems=this.description_data;
          console.log(this.invoiceupdation);
          this.invoiceupdation.InvoiceItems.forEach(element => {
             element.STATUS="Confirmed";
             
          });
          
          this.getservice.updateInvoiceItems(this.invoiceupdation).subscribe((z:any)=>{
            console.log(z);
            this.router.navigate(['/invoice' , JSON.stringify(this.userdetails)])
            
          })
        }
        else{
  
        }
      }
    );
    
  }
  async onClickProfile(ev: any) {  
    const popover = await this.popoverCtrl.create({  
        component: PopoverComponent,  
        event: ev,
        cssClass: 'popover',
        animated: true,  
        showBackdrop: false  
    });  
    return await popover.present();  
  }  

}
