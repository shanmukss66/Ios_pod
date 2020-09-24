import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonSlides, MenuController, PopoverController, IonContent, Platform, ModalController, LoadingController } from '@ionic/angular';
import { LateAndOnTimeFilterComponent } from '../late-and-on-time-filter/late-and-on-time-filter.component';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';
import { FilterDataForOnTimeAndLate } from '../models/FilterDataForOnTimeAndLate.model';
import { InvoiceHeaderDetail } from '../models/InvoiceHeaderDetail.model';
import { TokenResponse } from '../models/TokenResponse.model';
import { PopoverComponent } from '../popover/popover.component';
import { DataService } from '../services/BehaviourSubject.service';
import { GetService } from '../services/getservice.service';
import { ToastMaker } from '../Toast/ToastMaker.service';
@Component({
  selector: 'app-on-time-and-late-invs',
  templateUrl: './on-time-and-late-invs.page.html',
  styleUrls: ['./on-time-and-late-invs.page.scss'],
})
export class OnTimeAndLateInvsPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  @ViewChild('pageTop') pageTop: IonContent;
  sliderOptions = { pager: true, autoHeight: true }
  userdetails: TokenResponse = new TokenResponse();
  segment: number = 1;
  OnTimeInvoices: InvoiceHeaderDetail[];
  LateInvoices: InvoiceHeaderDetail[];
  FilterOnTimeInv:InvoiceHeaderDetail[];
  FilterLateInv:InvoiceHeaderDetail[];
  filterdata:FilterDataForOnTimeAndLate 
  constructor(private activatedRoute: ActivatedRoute,private modalCtrl:ModalController ,public popoverCtrl: PopoverController,private dataservice: DataService,private getservice:GetService ,private loadingController: LoadingController, private toast: ToastMaker, private loading: LoadingAnimation,private router: Router) { }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    this.segment = parseInt(this.activatedRoute.snapshot.paramMap.get('selected_id'));
    this.dataservice.SignedInUser(this.userdetails);
    this.loading.presentLoading().then(async () => {

      this.activatedRoute.data.subscribe((x: { OnTimeAndLateInv: any }) => {
        this.OnTimeInvoices = x.OnTimeAndLateInv[0];
        this.FilterOnTimeInv= x.OnTimeAndLateInv[0];
        console.log(this.OnTimeInvoices);

        this.LateInvoices = x.OnTimeAndLateInv[1];
        this.FilterLateInv = x.OnTimeAndLateInv[1];
        console.log(this.LateInvoices);

        this.segmentChanged(null);
        this.slideChanged();

        this.loadingController.getTop().then((has) => {
          if (has) {
            this.loadingController.dismiss();
          }
        })










      },
        (catchError) => {


          this.loadingController.getTop().then((has) => {
            if (has) {
              this.loadingController.dismiss();
            }
          })


          if (catchError.status == 0) {

            this.toast.internetConnection();


          }
          else {
            this.toast.wentWrong();


          }

        })

    })
  }


  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
    this.pageTop.scrollToTop();
    // if(this.segment==0){
    //  this.hidesearchstatus="no";
    // }else{
    //   this.hidesearchstatus="yes";
    // }
    
    
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

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


  async onClickFilterModal(){
    const filterModal = await this.modalCtrl.create({
      component:LateAndOnTimeFilterComponent,
      cssClass:"filter-ontimeandlate-modal",
      componentProps:{
        'usr_role':this.userdetails.userRole,
       
        'segment':this.segment
      }
    })
    await filterModal.present();
    const {data} = await filterModal.onWillDismiss();
    this.filterdata=data as FilterDataForOnTimeAndLate;

   this.loading.presentLoading().then(() => {
    try {
       if(this.filterdata!=null){
         if(this.segment==0){
           this.getservice.getLateDeliveryInvoices(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole,this.filterdata.st_date,this.filterdata.end_date,this.filterdata.plant,this.filterdata.division,this.filterdata.organization).subscribe((x:InvoiceHeaderDetail[])=>{
             this.FilterLateInv =x;
             console.log(this.FilterLateInv);
             
             this.loadingController.dismiss();
           },
           (catchError) => {
   
   
             this.loadingController.getTop().then((has) => {
               if (has) {
                 this.loadingController.dismiss();
               }
             })
   
   
             if (catchError.status == 0) {
   
               this.toast.internetConnection();
   
   
             }
             else {
               this.toast.wentWrong();
   
   
             }
   
           })
         }
         else{
          this.getservice.getOnTimeDeliveryInvoices(this.userdetails.userCode,this.userdetails.userID,this.userdetails.userRole,this.filterdata.st_date,this.filterdata.end_date,this.filterdata.plant,this.filterdata.division,this.filterdata.organization).subscribe((x:InvoiceHeaderDetail[])=>{
            this.FilterOnTimeInv =x;
            console.log(this.FilterOnTimeInv);
            
            this.loadingController.dismiss();
          },
          (catchError) => {
  
  
            this.loadingController.getTop().then((has) => {
              if (has) {
                this.loadingController.dismiss();
              }
            })
  
  
            if (catchError.status == 0) {
  
              this.toast.internetConnection();
  
  
            }
            else {
              this.toast.wentWrong();
  
  
            }
  
          })
         }
       }
       else{
        this.loadingController.dismiss();
         this.FilterLateInv=this.LateInvoices;
         this.FilterOnTimeInv = this.OnTimeInvoices;
       }
    } catch (error) {
      
     this.loadingController.dismiss()
     
    }

  }



  )
  }

}




