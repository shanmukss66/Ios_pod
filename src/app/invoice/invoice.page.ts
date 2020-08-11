import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, MenuController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenResponse } from '../models/TokenResponse.model';
import { InvoiceHeaderDetail } from '../models/InvoiceHeaderDetail.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PendingdailogComponent } from '../pendingdailog/pendingdailog.component';
import { GetService } from '../services/getservice.service';
import { InvoiceUpdation1 } from '../models/InvoiceUpdation1.model';
import { PopoverComponent } from '../popover/popover.component';
import { DataService } from '../services/BehaviourSubject.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  button;
  approvedinvoicedata: InvoiceHeaderDetail[];
  pendinginvoicedata: InvoiceHeaderDetail[];
  invoiceupdation:InvoiceUpdation1 = new InvoiceUpdation1();
  segment = 0;
  
  a = "confirmed";
  b = "pending";
  reportdate: number;
  ewaybillno: string = "";
  userdetails: TokenResponse = new TokenResponse();
  @ViewChild('slides', { static: true }) slider: IonSlides;
  constructor(private alertController: AlertController,private dataservice:DataService,public popoverCtrl: PopoverController, public menuCtrl: MenuController ,private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private getservice: GetService) {
    this.menuCtrl.enable(true, 'main-menu');
   }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.dataservice.SignedInUser(this.userdetails);
    this.activatedRoute.data.subscribe((x: { pending: any }) => {
      console.log(x.pending);
      this.pendinginvoicedata = x.pending;

    })
    this.activatedRoute.data.subscribe((y: { approved: any }) => {
      console.log(y.approved);
      this.approvedinvoicedata = y.approved;

    })
  }


  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }







  onClicknavigate(x, y: string) {
    this.router.navigate(['/description', JSON.stringify(this.userdetails), JSON.stringify(x), y])
  }



  openDailog(x: number,y:string) {
    const dialogConfig = new MatDialogConfig();




    this.getservice.getItemQuanttity(x).subscribe((data: any) => {
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = false;
      dialogConfig.data = {
        qnty: data,
        headerid: x,
        createdby:y
      };
      const dialogRef = this.dialog.open(PendingdailogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        (data) => {
          console.log("Dialog output:", data)
          this.reportdate = data;
          if(this.reportdate!=null){
            this.invoiceupdation.HEADER_ID=x;
            this.invoiceupdation.VEHICLE_REPORTED_DATE=new Date(data);
            console.log(this.invoiceupdation);
            
            this.getservice.confirmInvoiceItems(this.invoiceupdation).subscribe((z:any)=>{
              console.log(z);
             
              window.location.reload();
              
            })
          }
          
        }
      );
      
    })


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
