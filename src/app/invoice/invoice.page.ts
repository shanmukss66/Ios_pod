import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, MenuController, PopoverController, IonContent, Platform, ModalController } from '@ionic/angular';
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
import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { async } from '@angular/core/testing';
import { FilterParam } from '../models/FilterParam.model';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  
  approvedinvoicedata: InvoiceHeaderDetail[];
  pendinginvoicedata: InvoiceHeaderDetail[];
  partiallinvoicedata:InvoiceHeaderDetail[];
  filteredPendingInvoices: InvoiceHeaderDetail[];
  filteredApprovedInvoices: InvoiceHeaderDetail[];
  filteredPartiallyApprovedInvoices: InvoiceHeaderDetail[];
  invoiceupdation: InvoiceUpdation1 = new InvoiceUpdation1();
  segment:number= 1;
  filterdata: FilterParam = new FilterParam();
  filteredInvoices: InvoiceHeaderDetail[];
  hideConfirm:false;
  reportdate: number;
  sliderOptions = { pager: true, autoHeight: true }
  dataFromDailog: invUpdateandformdata;
  ewaybillno: string = "";
  hidesearchstatus="yes";
  
  userdetails: TokenResponse = new TokenResponse();
  @ViewChild('slides', { static: true }) slider: IonSlides;
  @ViewChild('pageTop') pageTop: IonContent;
  constructor(private loadingController: LoadingController,private modalCtrl:ModalController,private platform: Platform,private storage:StorageService, private toast: ToastMaker, private loading: LoadingAnimation, private dataservice: DataService, public popoverCtrl: PopoverController, public menuCtrl: MenuController, private router: Router, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private getservice: GetService) {
   
    this.menuCtrl.enable(true)
   
  }

  ngOnInit() {

     
   
   
    
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.segment  =  parseInt(this.activatedRoute.snapshot.paramMap.get('selected_id'));
    
    
     this.dataservice.SignedInUser(this.userdetails);
     

      this.getInvoices();
     
      
  }
  
  
  getInvoices() {
   
     
      this.loading.presentLoading().then(async ()=>{

     
      

  
      this.activatedRoute.data.subscribe((y: { approved: any }) => {
        console.log(y.approved);
       
        this.approvedinvoicedata = y.approved[0];
        if (this.filteredInvoices == null) {
          this.filteredApprovedInvoices = y.approved[0];
        }
    
        this.partiallinvoicedata=y.approved[1];
        if(this.filteredPartiallyApprovedInvoices == null){
          this.filteredPartiallyApprovedInvoices = y.approved[1];
        }
        this.pendinginvoicedata = y.approved[2];
        if (this.filteredInvoices == null) {
          this.filteredPendingInvoices = y.approved[2];

        }
        this.segmentChanged(null);
        this.slideChanged();
       
          
         
           
           
           
       
         
        
         this.loadingController.getTop().then((has)=>{
           if(has){
            this.loadingController.dismiss();
           }
         })
          
         

           
       
        
          
       
       
        
      },
        (catchError) => {

         
          this.loadingController.getTop().then((has)=>{
            if(has){
             this.loadingController.dismiss();
            }
          })
           
          
          if (catchError.status == 0) {

            this.toast.internetConnection();
            
            
          }
          else {
            this.toast.wentWrong();
            
            
          }

        }
       



      )
    })
    
  }

  

  getAllInvoices(usercode,status:string,stdate:string,endate:string,invnum:string,custname:string,plant:string,usrid:string,usrrole:string){
    this.loading.presentChartAnimation().then(()=>{
      this.getservice.getFilteredInvoice(usercode, status, stdate, endate, invnum, custname,plant ,usrid, usrrole).subscribe((data: any) => {
        this.filteredInvoices = data;
        console.log(data);
       this.filteredApprovedInvoices=[];
       this.filteredPartiallyApprovedInvoices=[];
       this.filteredPendingInvoices=[];
        this.filteredInvoices.forEach(z =>{
          if(z.STATUS=="Confirmed"){
            this.filteredApprovedInvoices.push(z)
          }
           if(z.STATUS =="PartiallyConfirmed"){
               this.filteredPartiallyApprovedInvoices.push(z); 
          }
           if(z.STATUS =="Saved"||z.STATUS=="Open"){
            this.filteredPendingInvoices.push(z);
          }
        })
        
        if (this.filteredApprovedInvoices.length==0 && this.segment!=2) {
          this.filteredApprovedInvoices = this.approvedinvoicedata;
          this.loadingController.dismiss();
        }
        if(this.filteredPartiallyApprovedInvoices.length==0 && this.segment!=1){
             this.filteredPartiallyApprovedInvoices = this.partiallinvoicedata;
             this.loadingController.dismiss();
        }
        if(this.filteredPendingInvoices.length==0 && this.segment!=0) {
          this.filteredPendingInvoices = this.pendinginvoicedata;
          this.loadingController.dismiss();
        }
  
       
       
        this.loading.loadingController.dismiss();
       
      },
      (catchError) => {
        
        this.loading.loadingController.dismiss();
  
        if (catchError.status == 0) {
  
          this.toast.internetConnection();
        }
        else {
          this.toast.wentWrong();
        }
      });
    })
    
  }


  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
    this.pageTop.scrollToTop();
    if(this.segment==0){
     this.hidesearchstatus="no";
    }else{
      this.hidesearchstatus="yes";
    }
    
    
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }




  // 


  onClicknavigate(x, y: string) {
    this.loading.presentLoading().then(()=>{
      try {
        
          this.router.navigate(['/description', JSON.stringify(this.userdetails), JSON.stringify(x), y]).then(()=>{
            this.loading.loadingController.dismiss();
          })
          
      } catch (error) {
        this.loading.loadingController.dismiss().then(()=>{
          this.toast.wentWrong()
        })
      }
    })
        
      
   

  }



  // openDailog(x: number, y: string) {
  //   const dialogConfig = new MatDialogConfig();




  //   this.getservice.getItemQuanttity(x).subscribe((data: any) => {
  //     dialogConfig.autoFocus = true;
      
  //     dialogConfig.data = {
  //       qnty: data,
  //       headerid: x,
  //       createdby: y
  //     };
  //     const dialogRef = this.dialog.open(PendingdailogComponent, dialogConfig);
  //     this.loading.presentLoading().then(() => {
  //     dialogRef.afterClosed().subscribe(
  //       (data: invUpdateandformdata) => {
  //         this.dataFromDailog = data
          
  //           if (data != null) {
  //             this.invoiceupdation.HEADER_ID = x;
  //             this.invoiceupdation.VEHICLE_REPORTED_DATE = new Date(data.reportdate);
  //             console.log(this.invoiceupdation);

  //             //update invoice
  //             this.getservice.confirmInvoiceItems(this.invoiceupdation).subscribe((z: any) => {   
  //               console.log(z);
                
  //               //upload files
  //               this.getservice.addInvoiceAttachment(this.dataFromDailog.files).subscribe((x: any) => {
  //                 console.log(x);
                  
  //                           if(!this.dataFromDailog.isfileEmpty){
  //                             this.getAllInvoices(this.userdetails.userName, "", "", "", "", "","" ,this.userdetails.userID, this.userdetails.userRole);
  //                             this.loadingController.dismiss();
  //                           }
            
            
            
  //               },
  //               (catchError) => {
  //                 this.loadingController.dismiss();
            
            
  //                 if (catchError.status == 0) {
            
  //                   this.toast.internetConnection();
  //                 }
  //                 else {
  //                   this.toast.wentWrongWithUpdatingInvoices();
  //                 }
  //               })
                
  //               if(this.dataFromDailog.isfileEmpty){
  //                 this.getAllInvoices(this.userdetails.userName, "", "", "", "", "","" ,this.userdetails.userID, this.userdetails.userRole);
  //                 this.loadingController.dismiss();
  //               }

                
               
  //             },
          
          
  //             (catchError) => {
  //               this.loadingController.dismiss();
          
          
  //               if (catchError.status == 0) {
          
  //                 this.toast.internetConnection();
  //               }
  //               else {
  //                 this.toast.wentWrongWithUpdatingInvoices();
  //               }
  //             }
          
              
  //             )
              

  //           }
            
              
  //             this.loadingController.dismiss();
  //             this.toast.confirmationCancelled();
  //       },
  //       () => {
  //         this.loadingController.dismiss();
  //         this.toast.wentWrongWithUpdatingInvoices();

  //       }
        
  //     );
  //   })

  //   },
  //   (catchError) => {
      


  //     if (catchError.status == 0) {

  //       this.toast.internetConnection();
  //     }
  //     else {
  //       this.toast.wentWrong();
  //     }
  //   })


  // }

 async OpenDialogModal(x: number, y: string,i:string,i_dt,l_dt){
   let tempQty=0;
  
      this.getservice.getItemQuanttity(x).subscribe( async (z: any) => {
      tempQty = z;
     
      
      const ConfirmInvoiceModal = await this.modalCtrl.create({
        component : PendingdailogComponent,
        cssClass:"Pending-Modal",
        componentProps:{
         'qnty': tempQty,
         'headerid': x,
         'createdby': y,
         'invoice_no':i,
         'i_dt':i_dt,
         'l_dt':l_dt
        }
      })
    
      
      await ConfirmInvoiceModal.present();
      const {data} = await ConfirmInvoiceModal.onWillDismiss();
      this.dataFromDailog = data;
     
       this.loading.presentLoading().then(()=>{
         if (data != null) {
           this.invoiceupdation.HEADER_ID = x;
           this.invoiceupdation.VEHICLE_REPORTED_DATE = new Date(data.reportdate);
           console.log(this.invoiceupdation);
   
           //update invoice
           this.getservice.confirmInvoiceItems(this.invoiceupdation).subscribe((z: any) => {   
             console.log(z);
             
             //upload files
             this.getservice.addInvoiceAttachment(this.dataFromDailog.files).subscribe((x: any) => {
               console.log(x);
               
                         if(!this.dataFromDailog.isfileEmpty){
                          setTimeout(()=>{
                            this.getAllInvoices(this.userdetails.userCode, "", "", "", "", "","" ,this.userdetails.userID, this.userdetails.userRole);
                            this.loadingController.dismiss();
                           this.toast.itemDetailsUpdationSuccess();
                          },2000)
                          
                         }
         
         
         
             },
             (catchError) => {
               this.loadingController.dismiss();
         
         
               if (catchError.status == 0) {
         
                 this.toast.internetConnection();
               }
               else {
                 this.toast.wentWrongWithUpdatingInvoices();
               }
             })
             
             if(this.dataFromDailog.isfileEmpty){
               setTimeout(()=>{
                this.getAllInvoices(this.userdetails.userName, "", "", "", "", "","" ,this.userdetails.userID, this.userdetails.userRole);
                this.loadingController.dismiss();
                this.toast.itemDetailsUpdationSuccess();
              },2000)
               
               
             }
   
             
            
           },
       
       
           (catchError) => {
             this.loadingController.dismiss();
       
       
             if (catchError.status == 0) {
       
               this.toast.internetConnection();
             }
             else {
               this.toast.wentWrongWithUpdatingInvoices();
             }
           }
       
           
           )
           
   
         }
         else{
           this.loadingController.dismiss();
           this.toast.confirmationCancelled();
         }
       })



    } )
  
 
   
  

   
  
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



  // onClickFilter() {
    
  //   const filterconfig = new MatDialogConfig();
  //   filterconfig.autoFocus = true;
  //   filterconfig.hasBackdrop = true;
  //   filterconfig.data = {
  //     x: this.userdetails.userRole,
  //     hidestatus:this.hidesearchstatus
  //   }
  //   const filter = this.dialog.open(FilterComponent, filterconfig);
  //   filter.afterClosed().subscribe((y: any) => {
  //     this.filterdata = y;
     
      
  //     this.loading.presentLoading().then(() => {
  //       try {
  //           if(y!=null){
  //             if (this.filterdata.get('flag').toString() == "yes") {
  //               this.loadingController.dismiss();
  //               this.getAllInvoices(this.userdetails.userName, this.filterdata.get('status').toString(), this.filterdata.get('start_date').toString(), this.filterdata.get('end_date').toString(), this.filterdata.get('invoice_number').toString(), this.filterdata.get('CustomerName').toString(),this.filterdata.get('plant').toString() ,this.userdetails.userID, this.userdetails.userRole)
    
                
    
  //             }
  //             else {
  //               this.loadingController.dismiss();
  //               this.filteredApprovedInvoices = this.approvedinvoicedata;
  //               this.filteredPendingInvoices = this.pendinginvoicedata;
  //               this.filteredPartiallyApprovedInvoices=this.partiallinvoicedata;
  //             }
  //           }
  //           else {
  //             this.loadingController.dismiss();
  //             this.filteredApprovedInvoices = this.approvedinvoicedata;
  //             this.filteredPendingInvoices = this.pendinginvoicedata;
  //             this.filteredPartiallyApprovedInvoices=this.partiallinvoicedata;
  //           }
         

  //       } catch (error) {
          
  //        this.loadingController.dismiss()
         
  //       }

  //     }



  //     )


  //   }

  //   )
  // }

 async onClickFilterModal(){
    const filterModal = await this.modalCtrl.create({
      component:FilterComponent,
      cssClass:"filter-modal",
      componentProps:{
        'usr_role':this.userdetails.userRole,
        'hide_status':this.hidesearchstatus,
        'segment':this.segment
      }
    })
    await filterModal.present();
    const {data} = await filterModal.onWillDismiss();
   this.filterdata = data
   this.loading.presentLoading().then(() => {
    try {
        if(this.filterdata!=null){
          
          console.log(this.filterdata.status);
          
          
            this.loadingController.dismiss();
            this.getAllInvoices(this.userdetails.userCode, this.filterdata.status, this.filterdata.stdate, this.filterdata.enddate, this.filterdata.invno, this.filterdata.customername,this.filterdata.plant ,this.userdetails.userID, this.userdetails.userRole)

            

         
         
        }
        else {
          this.loadingController.dismiss();
          this.filteredApprovedInvoices = this.approvedinvoicedata;
          this.filteredPendingInvoices = this.pendinginvoicedata;
          this.filteredPartiallyApprovedInvoices=this.partiallinvoicedata;
        }
     

    } catch (error) {
      
     this.loadingController.dismiss()
     
    }

  }



  )
  }
}
