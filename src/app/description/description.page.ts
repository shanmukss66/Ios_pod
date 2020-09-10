import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { reasonSelectOption } from '../models/reasonSelectOption.model';
import { Platform, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  userdetails: TokenResponse = new TokenResponse();
  invoicedetails: InvoiceHeaderDetail = new InvoiceHeaderDetail();
  description_data: InvoiceItemDetail[];
  copydescription_data: InvoiceItemDetail[]
  invoiceupdation: InvoiceUpdation = new InvoiceUpdation();
  dataForm: FormGroup;
  items: FormArray;
  dataArr: Array<any> = new Array<any>();
  cnfbtn_hidden = true;
  Forder: number = 0;
  dataFromDailog: invUpdateandformdata;
  disableSelect = false;
  header_id: InvoiceHeaderDetail;
  displayedColumns = ["material_code", "invoice_qty", "recieved_qty", "reason"];
  reasons: reasonSelectOption[] = [
    { id: 1, value: '1', viewValue: 'Completely received' },
    { id: 2, value: '2', viewValue: 'Partially received' },
    { id: 3, value: '3', viewValue: 'Damaged' },
    { id: 4, value: '4', viewValue: 'Others' }
  ];
  selected = "1";
 backButtonSub
  constructor(private router: Router, private platform: Platform,private formBuilder: FormBuilder, public loadingcontroller: LoadingController, private toast: ToastMaker, private loading: LoadingAnimation, private dataservice: DataService, private storage: StorageService, public popoverCtrl: PopoverController, public menuCtrl: MenuController, private getservice: GetService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
   
    this.platform.backButton.subscribeWithPriority(0,()=>{
      this.loading.presentLoading().then(()=>{
        try {
          this.router.navigate(['/invoice' , JSON.stringify(this.userdetails),0]).then(()=>{
            this.loading.loadingController.dismiss();
            
          })
        } catch (error) {
          this.loading.loadingController.dismiss();
          this.toast.wentWrong();
        }
       
         
      })
    })
  }
  
  ionViewWillLeave() {
    this.dataArr = [];
  }

  

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.invoicedetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('header_id'));
    this.header_id = JSON.parse(this.activatedRoute.snapshot.paramMap.get('header_id'));
   

    console.log(this.invoicedetails);
    this.dataservice.SignedInUser(this.userdetails);
    console.log((this.activatedRoute.snapshot.paramMap.get('type')));

    if ((this.activatedRoute.snapshot.paramMap.get('type')) == "PartiallyConfirmed") {
      this.cnfbtn_hidden = true;

    }
    else if ((this.activatedRoute.snapshot.paramMap.get('type')) == "Confirmed") {
      this.cnfbtn_hidden = true;
    }
    else if (this.userdetails.userRole != "Customer" && this.invoicedetails.STATUS == "Saved") {
      this.cnfbtn_hidden = false;
    }
    else if (this.userdetails.userRole != "Customer" && this.invoicedetails.STATUS == "Open") {
      this.cnfbtn_hidden = true;
    }
    else {
      this.cnfbtn_hidden = false;
    }
    this.activatedRoute.data.subscribe((x: { descrptn: any }) => {
      console.log(x.descrptn);
      this.description_data = x.descrptn;
      this.copydescription_data = this.description_data;
      this.CreateFormControls()
    },
      (catchError) => {



        if (catchError.status == 0) {

          this.toast.internetConnection();
          this.router.navigate(['/charts', JSON.stringify(this.userdetails)])
        }
        else {
          this.toast.wentWrong();
          this.router.navigate(['/charts', JSON.stringify(this.userdetails)])
        }
      }
    )

  }

  CreateFormControls() {
    this.dataForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.description_data.forEach(z => {

      if (z.REASON == null && z.RECEIVED_QUANTITY == null) {

        this.dataArr.push({ 'mat': z.MATERIAL_CODE, 'qty': z.QUANTITY, 'uom': z.QUANTITY_UOM, 'rcvd': z.QUANTITY, 'reason': '1' })
      }
      else if (z.RECEIVED_QUANTITY == null) {
        this.dataArr.push({ 'mat': z.MATERIAL_CODE, 'qty': z.QUANTITY, 'uom': z.QUANTITY_UOM, 'rcvd': z.RECEIVED_QUANTITY, 'reason': this.reasons.find(d => d.viewValue == z.REASON).value })
      }
      else if (z.REASON == null) {
        this.dataArr.push({ 'mat': z.MATERIAL_CODE, 'qty': z.QUANTITY, 'uom': z.QUANTITY_UOM, 'rcvd': z.QUANTITY, 'reason': '1' })
      }
      else {
        this.dataArr.push({ 'mat': z.MATERIAL_CODE, 'qty': z.QUANTITY, 'uom': z.QUANTITY_UOM, 'rcvd': z.RECEIVED_QUANTITY, 'reason': this.reasons.find(d => d.viewValue == z.REASON).value })
      }


    })
    console.log(this.dataArr);
    this.items = this.dataForm.get('items') as FormArray;
    this.dataArr.forEach((z: any) => {

      const ctrl = this.formBuilder.group({
        key: [z.reason],
        mat: [z.mat],
        qty: [z.qty],
        uom: [z.uom],
        rcvd: [z.rcvd, [Validators.required, Validators.max(parseInt(z.qty))]]

      })
      this.items.push(ctrl);
    })
    this.initializeFormControls()
  }

  initializeFormControls() {
    let formvalues = this.dataForm.get('items').value;
    for (let h in formvalues) {
      this.onChangeQty(formvalues[h].rcvd, h);
    }
  }



  onFormSubmit() {
    let reasonctrl = (<FormArray>this.dataForm.get('items'));
    if (reasonctrl.valid) {
      this.loading.presentLoading().then(() => {
        for (let h in this.copydescription_data) {

          reasonctrl.controls[h].get('key').enable();


        }
        let formvalues = this.dataForm.get('items').value;

        for (let h in this.copydescription_data) {
          this.copydescription_data[h].REASON = (this.reasons.find(x => x.value === formvalues[h].key)).viewValue;
          this.copydescription_data[h].RECEIVED_QUANTITY = formvalues[h].rcvd;
          this.copydescription_data[h].STATUS = "Saved"
        }
        console.log(this.copydescription_data);
        this.invoiceupdation.VEHICLE_REPORTED_DATE = new Date(null);
        this.invoiceupdation.InvoiceItems = this.copydescription_data;
        this.getservice.updateInvoiceItems(this.invoiceupdation).subscribe((z: any) => {
          this.dataArr = [];
          this.getservice.getItemDescription(this.userdetails.userCode, this.userdetails.userID, this.userdetails.userRole, JSON.stringify(this.header_id.HEADER_ID)).subscribe((l: any) => {
            this.description_data = l;
            this.copydescription_data = this.description_data;
            this.CreateFormControls()
          });
          this.toast.itemDetailsUpdationSuccess()
        },
          (catchError) => {



            if (catchError.status == 0) {

              this.toast.internetConnection();
              this.loading.loadingController.dismiss();
            }
            else {
              this.toast.wentWrong();
              this.loading.loadingController.dismiss();
            }
          })
        this.loading.loadingController.dismiss();
      })

    }
    else {
      this.toast.checkTable();
    }





  }



  onChangeQty(s: number, i) {
    let reasonctrl = (<FormArray>this.dataForm.get('items')).controls[i].get('key')
    if (this.description_data[i].QUANTITY == s) {
      reasonctrl.disable();
      reasonctrl.setValue('1');
    }
    else {
      reasonctrl.enable();
    }

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
    
    this.loading.presentLoading().then(() => {
      dialogRef.afterClosed().subscribe(

        (data: invUpdateandformdata) => {
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
              this.getservice.addInvoiceAttachment(this.dataFromDailog.files).subscribe((x: any) => {
                console.log(x);
              },
                (catchError) => {
                  this.loadingcontroller.dismiss();


                  if (catchError.status == null) {

                    this.toast.internetConnection();
                  }
                  else {
                    this.toast.wentWrongWithUpdatingInvoices();
                  }
                })


              this.loading.loadingController.dismiss().then(() => {
                this.router.navigate(['/invoice', JSON.stringify(this.userdetails),"2"])
              });

            },
              (catchError) => {
                this.loadingcontroller.dismiss();


                if (catchError.status == null) {

                  this.toast.internetConnection();
                }
                else {
                  this.toast.wentWrongWithUpdatingInvoices();
                }
              }


            )

          }
          else{
            this.loadingcontroller.dismiss();
            this.toast.confirmationCancelled();
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
