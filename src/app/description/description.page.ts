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
import { MenuController, PopoverController, LoadingController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { DataService } from '../services/BehaviourSubject.service';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { ToastMaker } from '../Toast/ToastMaker.service';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  userdetails: TokenResponse = new TokenResponse();
  invoicedetails: InvoiceHeaderDetail = new InvoiceHeaderDetail();
  description_data: InvoiceItemDetail[];
  invoiceupdation: InvoiceUpdation = new InvoiceUpdation();
  cnfbtn_hidden = true;
  Forder:number = 0;
  dataFromDailog :invUpdateandformdata
  constructor(private router: Router,public loadingcontroller:LoadingController,private toast:ToastMaker,private loading:LoadingAnimation ,private dataservice: DataService,private storage:StorageService ,public popoverCtrl: PopoverController, public menuCtrl: MenuController, private getservice: GetService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.invoicedetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('header_id'));
    this.Forder = parseInt(this.invoicedetails.FREIGHT_ORDER.toString());
    console.log(this.invoicedetails);
     this.dataservice.SignedInUser(this.userdetails);
    console.log((this.activatedRoute.snapshot.paramMap.get('type')));

    if ((this.activatedRoute.snapshot.paramMap.get('type')) == "pending") {
      this.cnfbtn_hidden = false;

    }
    else {
      this.cnfbtn_hidden = true;
    }
    this.activatedRoute.data.subscribe((x: { descrptn: InvoiceItemDetail[] }) => {
      console.log(x.descrptn);
      this.description_data = x.descrptn;
      
    },
    (catchError) => {
      


      if (catchError.status == 0) {

        this.toast.internetConnection();
        this.router.navigate(['/charts' , JSON.stringify(this.userdetails)])
      }
      else {
        this.toast.wentWrong();
        this.router.navigate(['/charts' , JSON.stringify(this.userdetails)])
      }
    }
    )
  }

  openDailog(x: number) {
    const dialogConfig = new MatDialogConfig();


    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {

      headerid: this.invoicedetails.HEADER_ID,
      createdby: this.invoicedetails.CREATED_BY
    };
    const dialogRef = this.dialog.open(DescriptiondailogComponent, dialogConfig);
    this.loading.presentLoading().then(()=>{
    dialogRef.afterClosed().subscribe(

      (data:invUpdateandformdata) => {
      this.dataFromDailog = data
        console.log("Dialog output:", data)
      
        if (data != null) {

          this.invoiceupdation.VEHICLE_REPORTED_DATE = new Date(data.reportdate);
          this.invoiceupdation.InvoiceItems = this.description_data;
          console.log(this.invoiceupdation);
          this.invoiceupdation.InvoiceItems.forEach(element => {
            element.STATUS = "Confirmed";

          });

         //update Invoice
          this.getservice.updateInvoiceItems(this.invoiceupdation).subscribe((z: any) => {
            console.log(z);
           //upload files 
            this.getservice.addInvoiceAttachment(this.dataFromDailog.files).subscribe((x:any)=>{
              console.log(x);
            },
            (catchError) => {
              this.loadingcontroller.dismiss();
        
        
              if (catchError.status == null) {
        
                this.toast.internetConnection();
              }
              else {
                this.toast.wentWrong();
              }
            })
           
            
              this.loading.loadingController.dismiss().then(()=>{
                this.router.navigate(['/invoice', JSON.stringify(this.userdetails)])
               });
            
          },
           (catchError) => {
            this.loadingcontroller.dismiss();
      
      
            if (catchError.status == null) {
      
              this.toast.internetConnection();
            }
            else {
              this.toast.wentWrong();
            }
          }
         
      
          )
        
        }
        
      
      
      
      },
      () => {
        this.loadingcontroller.dismiss();
        this.toast.wentWrongWithUpdatingInvoices();

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
