import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ChartType } from 'chart.js';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router'
import { MultiDataSet, Label } from 'ng2-charts';
import { TokenResponse } from '../models/TokenResponse.model';
import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
import { DeliveryCount } from '../models/DeliveryCount.model';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';  
import { PopoverComponent } from '../popover/popover.component';
import { DataService } from '../services/BehaviourSubject.service';
import { LoadingController } from '@ionic/angular';
import { pipe, interval } from 'rxjs';
import { retry } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { delAndInv } from '../models/delAndInv.model';
import { GetAllChartData } from '../services/GetAllChartData.service';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit,AfterViewInit {
  confirmedinvoices: number=0;
  pendinginvoices: number=0;
  inlinedelvery: number=0;
  delayeddelivery: number=0;
  inline: number=0;
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvas1') doughnutCanvas1;
  
  doughnutChart: any;
  doughnutChart1: any;
  destroycharts:any;
  mouse_event:any
  ref;
  userdetails: TokenResponse = new TokenResponse();
  displayname: string = "";
  invoicechartdata: InvoiceStatusCount = new InvoiceStatusCount();
  deliverychartdata: DeliveryCount = new DeliveryCount();

  


  constructor(private router: Router, private alrtctrl:AlertController,private m:GetAllChartData, private platform: Platform,private storage:StorageService,public loading:LoadingAnimation ,private dataservice:DataService,public popoverCtrl: PopoverController ,private activatedRoute: ActivatedRoute,public menuCtrl: MenuController) { 
    this.platform.backButton.subscribeWithPriority(0,async ()=>{
     
       const alert = await this.alrtctrl.create({
         message:"Do you really want to exit?",
         buttons:[
           {
             text:'No',
             role:"cancel"
           },
           {
             text:"Yes",
             handler:()=>{
               navigator["app"].exitApp();
             }
           }
         ]
       })
       await alert.present();
    
    
   })
  }
  ngAfterViewInit(): void {
   
  }
  
  // ionViewWillLeave(){
  //   console.log("hello");
    
  //  this.doughnutCanvas= null;
  //  this.doughnutCanvas1 = null;
  // }
 
  ngOnInit() {
    
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
     this.dataservice.SignedInUser(this.userdetails);
    this.displayname = this.userdetails.displayName;
    
    this.loading.presentLoading().then(() => {
     this.activatedRoute.data.subscribe(
      (data: { delivery: any[] }) => {


        this.deliverychartdata = data.delivery[0];

      


        console.log(data.delivery);
        this.invoicechartdata = data.delivery[1];
        
        console.log(this.invoicechartdata);
        this.doughnutChartMethod()
        this.doughnutChartMethod1()
        this.loading.loadingController.dismiss();


      }
    )
    
    })
  }

  
  
  

  // ngOnInit() {
    
    
  //   this.loading.presentLoading().then(()=>{
  //     this.m.getpart().subscribe((x:any)=>{
  //       this.userdetails = x.tok;
  //       this.dataservice.SignedInUser(this.userdetails);
  //     this.displayname = this.userdetails.displayName;
  //       this.deliverychartdata = x.del;
  //       this.invoicechartdata = x.inv;
       
  //       this.doughnutChartMethod()
  //       this.doughnutChartMethod1()
  //       this.loading.loadingController.dismiss();
  //     } )
       
  //      })
        
    
 // }

  
 
  
  
  doughnutChartMethod() {
    this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {
      type: 'doughnut',
      options: {
        responsive:false,
        cutoutPercentage: 60,
        legend : {position:'right',
        
        labels:{
          usePointStyle:true,
          fontFamily : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontSize : 10,
          
        },
      }
      },
      data: {
        labels: ['Approved'+"  "+"("+this.deliverychartdata.InLineDelivery+")",'Pending'+"  "+"("+this.deliverychartdata.DelayedDelivery+")"] ,
        datasets: [{
          
          data: [this.deliverychartdata.InLineDelivery, this.deliverychartdata.DelayedDelivery],
          backgroundColor: [

            '#52de97',
            '#eff54f',

          ],

        }]
      }
    });
  }
  
  doughnutChartMethod1() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',

      
      data: {
        labels :['INVOICE DISPATCHED'+"  "+"("+this.invoicechartdata.PendingInvoices+")",'PARTIALLY CONFIRMED'+"  "+"("+this.invoicechartdata.PartiallyConfirmedInvoices+")",'POD CONFIRMED'+"  "+"("+this.invoicechartdata.ConfirmedInvoices+")"],
        
        datasets: [{
          
          data: [this.invoicechartdata.ConfirmedInvoices,this.invoicechartdata.PartiallyConfirmedInvoices ,this.invoicechartdata.PendingInvoices],
      
          backgroundColor: [
            '#fb7800',
            '#44c0b6',
            '#4452c6'
          ],

        }]
      },
      options: {
        responsive:false,
        cutoutPercentage: 60,
        
        legend : {position:'right',
       
        labels:{
          usePointStyle:true,
          fontFamily : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontSize : 10
        },
      },onClick : (e,i:any)=>{
        if(i[0]!=null){
          console.log(i[0]._index);
        this.loading.presentLoading().then(()=>{
          this.router.navigate(['/invoice',JSON.stringify(this.userdetails),JSON.stringify(i[0]._index)]).then(()=>{
            this.loading.loadingController.dismiss();
          })
        })
        }
        
      }
      }
    });
  }
  // events
  

  
  async onClickProfile(ev: any) {  
    this.mouse_event=ev;
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
