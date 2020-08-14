import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, MenuController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenResponse } from '../models/TokenResponse.model';
import { InvoiceHeaderDetail } from '../models/InvoiceHeaderDetail.model';
import { LoadingController } from '@ionic/angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PendingdailogComponent } from '../pendingdailog/pendingdailog.component';
import { GetService } from '../services/getservice.service';
import { InvoiceUpdation1 } from '../models/InvoiceUpdation1.model';
import { PopoverComponent } from '../popover/popover.component';
import { DataService } from '../services/BehaviourSubject.service';
import { FilterComponent } from '../filter/filter.component';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';
import { ToastMaker } from '../Toast/ToastMaker.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  button;
  approvedinvoicedata: InvoiceHeaderDetail[];
  pendinginvoicedata: InvoiceHeaderDetail[];
  filteredPendingInvoices: InvoiceHeaderDetail[];
  filteredApprovedInvoices: InvoiceHeaderDetail[];
  invoiceupdation: InvoiceUpdation1 = new InvoiceUpdation1();
  segment = 0;
  filterdata: FormData = new FormData();
  filteredInvoices: InvoiceHeaderDetail[];
  a = "confirmed";
  b = "pending";
  reportdate: number;
  dataFromDailog: invUpdateandformdata;
  ewaybillno: string = "";
  userdetails: TokenResponse = new TokenResponse();
  @ViewChild('slides', { static: true }) slider: IonSlides;
  constructor(public loadingController: LoadingController, private toast: ToastMaker, private loading: LoadingAnimation, private dataservice: DataService, public popoverCtrl: PopoverController, public menuCtrl: MenuController, private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private getservice: GetService) {
    this.menuCtrl.enable(true, 'main-menu');

  }

  ngOnInit() {


    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.dataservice.SignedInUser(this.userdetails);


    this.getInvoices();
  }

  getInvoices() {
    this.activatedRoute.data.subscribe((y: { approved: any }) => {
      console.log(y.approved);
      this.approvedinvoicedata = y.approved[0];
      if (this.filteredInvoices == null) {
        this.filteredApprovedInvoices = y.approved[0];
      }


      this.pendinginvoicedata = y.approved[1];
      if (this.filteredInvoices == null) {
        this.filteredPendingInvoices = y.approved[1];

      }
    })
  }



  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }







  onClicknavigate(x, y: string) {
    this.loading.presentLoading().then(() => {
      this.router.navigate(['/description', JSON.stringify(this.userdetails), JSON.stringify(x), y]).then(() => {
        this.loadingController.dismiss();
        (catchError) => {
          this.loadingController.dismiss();


          if (catchError.status == null) {

            this.toast.internetConnection();
          }
          else {
            this.toast.wentWrong();
          }
        }
      })
    })

  }



  openDailog(x: number, y: string) {
    const dialogConfig = new MatDialogConfig();




    this.getservice.getItemQuanttity(x).subscribe((data: any) => {
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = false;
      dialogConfig.data = {
        qnty: data,
        headerid: x,
        createdby: y
      };
      const dialogRef = this.dialog.open(PendingdailogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        (data: invUpdateandformdata) => {
          this.dataFromDailog = data
          this.loading.presentLoading().then(() => {
            if (data != null) {
              this.invoiceupdation.HEADER_ID = x;
              this.invoiceupdation.VEHICLE_REPORTED_DATE = new Date(data.reportdate);
              console.log(this.invoiceupdation);
              this.updateInvoice();
              (catchError) => {
                this.loadingController.dismiss();


                if (catchError.status == null) {

                  this.toast.internetConnection();
                }
                else {
                  this.toast.wentWrong();
                }
              }

            }
            this.loadingController.dismiss().then(() => {
              window.location.reload();
            })
          })


        }
      );

    })


  }


  updateInvoice() {
    this.getservice.confirmInvoiceItems(this.invoiceupdation).subscribe((z: any) => {
      console.log(z);
      this.updateInvoiceFiles();
      (catchError) => {
        this.loadingController.dismiss();


        if (catchError.status == null) {

          this.toast.internetConnection();
        }
        else {
          this.toast.wentWrong();
        }
      }

    })
  }

  updateInvoiceFiles() {
    this.getservice.addInvoiceAttachment(this.dataFromDailog.files).subscribe((x: any) => {
      console.log(x);
      (catchError) => {
        this.loadingController.dismiss();


        if (catchError.status == null) {

          this.toast.internetConnection();
        }
        else {
          this.toast.wentWrong();
        }
      }

    


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



  onClickFilter() {
    const filterconfig = new MatDialogConfig();
    filterconfig.autoFocus = true;
    filterconfig.data = {
      x: '23'
    }
    const filter = this.dialog.open(FilterComponent, filterconfig);
    filter.afterClosed().subscribe((y: FormData) => {
      this.filterdata = y;
      if (this.filterdata.get('flag').toString() == "yes") {
        this.loading.presentLoading().then(() => {
          this.getservice.getFilteredInvoice(this.userdetails.userName, this.filterdata.get('status').toString(), this.filterdata.get('start_date').toString(), this.filterdata.get('end_date').toString(), this.filterdata.get('invoice_number').toString(), this.filterdata.get('LR_number').toString(), this.userdetails.userID, this.userdetails.userRole).subscribe((data: any) => {
            this.filteredInvoices = data;

            if (this.filteredInvoices[0].STATUS == "Confirmed") {
              this.filteredApprovedInvoices = this.filteredInvoices;
              this.loadingController.dismiss();
            }
            else {
              this.filteredPendingInvoices = this.filteredInvoices;
              this.loadingController.dismiss();
            }



            (catchError) => {
              this.loadingController.dismiss();


              if (catchError.status == null) {

                this.toast.internetConnection();
              }
              else {
                this.toast.wentWrong();
              }
            }
          });

          this.loadingController.dismiss();
        })
      }
      else {
        this.loadingController.dismiss();
        this.filteredApprovedInvoices = this.approvedinvoicedata;
        this.filteredPendingInvoices = this.pendinginvoicedata;
      }




    }

    )
  }
}
