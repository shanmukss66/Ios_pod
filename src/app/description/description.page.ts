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
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { reasonSelectOption } from '../models/reasonSelectOption.model';
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
  dataForm: FormGroup;
  items: FormArray;
  dataArr: Array<any>=new Array<any>();
  cnfbtn_hidden = true;
  Forder: number = 0;
  dataFromDailog: invUpdateandformdata;
  

  displayedColumns = ["material_code", "invoice_qty", "recieved_qty", "reason"];
  reasons: reasonSelectOption[] = [
    { id:1,value: '1', viewValue: 'Completely received' },
    { id:2,value: '2', viewValue: 'Partially received' },
    { id:3,value: '3', viewValue: 'Damaged' },
    { id:4,value: '4', viewValue: 'Others' }
  ];
  selected = "1";
  constructor(private router: Router, private formBuilder:FormBuilder,public loadingcontroller: LoadingController, private toast: ToastMaker, private loading: LoadingAnimation, private dataservice: DataService, private storage: StorageService, public popoverCtrl: PopoverController, public menuCtrl: MenuController, private getservice: GetService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.invoicedetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('header_id'));
   
   
   
    console.log(this.invoicedetails);
    this.dataservice.SignedInUser(this.userdetails);
    console.log((this.activatedRoute.snapshot.paramMap.get('type')));
   
    if ((this.activatedRoute.snapshot.paramMap.get('type')) == "pending") {
      this.cnfbtn_hidden = false;

    }
    else {
      this.cnfbtn_hidden = true;
    }
   
    this.activatedRoute.data.subscribe((x: { descrptn: any }) => {
      console.log(x.descrptn);
      this.description_data= x.descrptn;
      this.dataForm = this.formBuilder.group({
        items: this.formBuilder.array([])
      });
      this.description_data.forEach(z=>{
       
        
          this.dataArr.push({'mat':z.MATERIAL_CODE,'qty':z.QUANTITY,'uom':z.QUANTITY_UOM,'rcvd':z.RECEIVED_QUANTITY,'reason':'1'})
    
       
      })
      console.log(this.dataArr);
      this.items = this.dataForm.get('items') as FormArray;
      this.dataArr.forEach((z:any)=>{
        const ctrl= this.formBuilder.group({
          key: [z.reason],
          mat:[z.mat],
          qty:[z.qty],
          uom:[z.uom],
          rcvd:[z.qty]
          
        })
        this.items.push(ctrl);
      })
      
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
  
  
  onFormSubmit(){
    
    console.log(this.dataForm.get('items').value)
  }
 
  onSelectDemo(i){
  
   
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
                    this.toast.wentWrong();
                  }
                })


              this.loading.loadingController.dismiss().then(() => {
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
