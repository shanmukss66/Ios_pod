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
import 'chartjs-plugin-labels';
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
  
  public doughnutChartOptions = {
    responsive: false,
    
    legend: {
        position: "right",
        labels: {
            fontSize: 10,
            
            usePointStyle: true,
        },
    },
    cutoutPercentage: 60,
    elements: {
        arc: {
            borderWidth: 0,
        },
    },
    plugins: {
        labels: {
            // tslint:disable-next-line:typedef
            render: function (args) {
                return args.value;
            },
            fontColor: "#000",
            position: "default",
            // outsidePadding: 0,
            // textMargin: 0
        },
    },
};
public doughnutChartType: ChartType = "doughnut";
public doughnutChartLabels: any[] = [
    "CONFIRMED INVOICES",
    "PARTIALLY CONFIRMED",
    "PENDING INVOICES",
];
public doughnutChartData: any[] = [[0, 0]];
// public doughnutChartData: any[] = [];
public colors: any[] = [{ backgroundColor: ["#52de97", '#4452c6', "#fb7800"] }];

public doughnutChartOptions1 = {
    responsive: false,
   
    legend: {
        position: "right",
        labels: {
            fontSize: 10,
           
            usePointStyle: true,
        },
    },
    cutoutPercentage: 60,
    elements: {
        arc: {
            borderWidth: 0,
        },
    },
    plugins: {
        labels: {
            // tslint:disable-next-line:typedef
            render: function (args) {
                return args.value;
            },
            fontColor: "#000",
            position: "default",
            // outsidePadding: 0,
            // textMargin: 0
        },
    },
};
public doughnutChartType1: ChartType = "doughnut";
public doughnutChartLabels1: any[] = ["ON TIME DELIVERY", "LATE DELIVERY"];
public doughnutChartData1: any[] = [[0, 0]];
// public doughnutChartData: any[] = [];
public colors1: any[] = [{ backgroundColor: ["#52de97", "#eff54f"] }];
  
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
    this.menuCtrl.enable(true)
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
        const chartData1: number[] = [];
        chartData1.push(this.deliverychartdata.InLineDelivery);
        chartData1.push(this.deliverychartdata.DelayedDelivery);

        this.doughnutChartData1 = chartData1;

      

        
        console.log(data.delivery);
        this.invoicechartdata = data.delivery[1];
        const chartData: number[] = [];
        chartData.push(this.invoicechartdata.ConfirmedInvoices);
        chartData.push(this.invoicechartdata.PartiallyConfirmedInvoices);
        chartData.push(this.invoicechartdata.PendingInvoices);
        this.doughnutChartData = chartData;             
        console.log(this.invoicechartdata);
       
        
        let t=this.loading.loadingController.getTop();
         if(t){
          this.loading.loadingController.dismiss();
         }
        

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

  
 
  
  
  // doughnutChartMethod() {
  //   this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {
  //     type: 'doughnut',
  //     options: {
  //       responsive:false,
  //       cutoutPercentage: 60,
  //       legend : {position:'right',
        
  //       labels:{
  //         usePointStyle:true,
  //         fontFamily : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  //         fontSize : 10,
          
  //       },
  //     }
  //     },
  //     data: {
  //       labels: ['Approved'+"  "+"("+this.deliverychartdata.InLineDelivery+")",'Pending'+"  "+"("+this.deliverychartdata.DelayedDelivery+")"] ,
  //       datasets: [{
          
  //         data: [this.deliverychartdata.InLineDelivery, this.deliverychartdata.DelayedDelivery],
  //         backgroundColor: [

  //           '#52de97',
  //           '#eff54f',

  //         ],

  //       }]
  //     }
  //   });
  // }
  
  // doughnutChartMethod1() {
  //   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
  //     type: 'doughnut',

      
  //     data: {
  //       labels :['INVOICE DISPATCHED'+"  "+"("+this.invoicechartdata.PendingInvoices+")",'PARTIALLY CONFIRMED'+"  "+"("+this.invoicechartdata.PartiallyConfirmedInvoices+")",'POD CONFIRMED'+"  "+"("+this.invoicechartdata.ConfirmedInvoices+")"],
        
  //       datasets: [{
          
  //         data: [this.invoicechartdata.ConfirmedInvoices,this.invoicechartdata.PartiallyConfirmedInvoices ,this.invoicechartdata.PendingInvoices],
      
  //         backgroundColor: [
  //           '#fb7800',
  //           '#44c0b6',
  //           '#4452c6'
  //         ],

  //       }]
  //     },
  //     options: {
  //       responsive:false,
  //       cutoutPercentage: 60,
        
  //       legend : {position:'right',
       
  //       labels:{
  //         usePointStyle:true,
  //         fontFamily : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  //         fontSize : 10
  //       },
  //     },onClick : (e,i:any)=>{
  //       if(i[0]!=null){
  //         console.log(i[0]._index);
  //       this.loading.presentLoading().then(()=>{
  //         this.router.navigate(['/invoice',JSON.stringify(this.userdetails),JSON.stringify(i[0]._index)]).then(()=>{
  //           this.loading.loadingController.dismiss();
  //         })
  //       })
  //       }
        
  //     }
  //     }
  //   });
  // }
  // events
  

  doughnutChart1Clicked(e: any): void {
    console.log(e);
    if (e.active.length > 0) {
        const chart = e.active[0]._chart;
        const activePoints = chart.getElementAtEvent(e.event);
        if (activePoints.length > 0) {
            // get the internal index of slice in pie chart
            const clickedElementIndex = activePoints[0]._index;
            const label = chart.data.labels[clickedElementIndex] as String;
            // get value by index
            const value = chart.data.datasets[0].data[clickedElementIndex];
            console.log(clickedElementIndex, label, value);
            if (label.toLowerCase() === "on time delivery") {
                // this.currentLabel = 'ON TIME DELIVERY';
                // if (this.currentUserRole === "Amararaja User") {
                //     this.FilterOnTimeDeliveryInvoices();
                // } else if (this.currentUserRole === "Customer") {
                //     this.FilterOnTimeDeliveryInvoicesByUser();
                // }
            }
            else if (label.toLowerCase() === "late delivery") {
                // this.currentLabel = 'LATE DELIVERY';
                // if (this.currentUserRole === "Amararaja User") {
                //     this.FilterLateDeliveryInvoices();
                // } else if (this.currentUserRole === "Customer") {
                //     this.FilterLateDeliveryInvoicesByUser();
                // }
            }
        }
    }
}

doughnutChartClicked(e: any): void {
  console.log(e);
  if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
          // get the internal index of slice in pie chart
          const clickedElementIndex = activePoints[0]._index;
          const label = chart.data.labels[clickedElementIndex] as String;
          // get value by index
          const value = chart.data.datasets[0].data[clickedElementIndex];
          console.log(clickedElementIndex, label, value);
          if (label) {
              if (label.toLowerCase() === "pending invoices") {
                this.loading.presentLoading().then(()=>{
                          this.router.navigate(['/invoice',JSON.stringify(this.userdetails),JSON.stringify(0)])
                           this.loading.loadingController.dismiss();
                          
                       })
              }
              else if (label.toLowerCase() === "confirmed invoices") {
                this.loading.presentLoading().then(()=>{
                          this.router.navigate(['/invoice',JSON.stringify(this.userdetails),JSON.stringify(2)])
                            this.loading.loadingController.dismiss();
                           
                         })
              }
              else if (label.toLowerCase() === "partially confirmed") {
                this.loading.presentLoading().then(()=>{
                         this.router.navigate(['/invoice',JSON.stringify(this.userdetails),JSON.stringify(1)])
                             this.loading.loadingController.dismiss();
                          
                         })
              }
          }
      }
  }
}

  
  async onClickProfile(ev: any) {  
    this.mouse_event=ev;
    const popover = await this.popoverCtrl.create({  
        component: PopoverComponent,  
        event: ev,
        cssClass: 'popover',
        animated: true,  
        showBackdrop: false  
    });  
   await popover.present();  
    
  }  



  
  

}
