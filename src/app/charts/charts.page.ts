import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router'
import { MultiDataSet, Label } from 'ng2-charts';
import { TokenResponse } from '../models/TokenResponse.model';
import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
import { DeliveryCount } from '../models/DeliveryCount.model';
import { MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';  
import { PopoverComponent } from '../popover/popover.component';
import { DataService } from '../services/BehaviourSubject.service';
import { LoadingController } from '@ionic/angular';
import { pipe, interval } from 'rxjs';
import { retry } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { delAndInv } from '../models/delAndInv.model';
import { DeliveryResolver } from '../services/deliveryChartResolver.service';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  confirmedinvoices: number=0;
  pendinginvoices: number=0;
  inlinedelvery: number=0;
  delayeddelivery: number=0;
  inline: number=0;
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvas1') doughnutCanvas1;
  doughnutChart: any;
  doughnutChart1: any;
  userdetails: TokenResponse = new TokenResponse();
  displayname: string = "";
  invoicechartdata: InvoiceStatusCount = new InvoiceStatusCount();
  deliverychartdata: DeliveryCount = new DeliveryCount();

  


  constructor(private router: Router,private m:DeliveryResolver,private storage:StorageService,public loading:LoadingAnimation ,private dataservice:DataService,public popoverCtrl: PopoverController ,private activatedRoute: ActivatedRoute,public menuCtrl: MenuController) { 
    
  }

  ngOnInit() {
     
   
    
    
     
    
    //  this.activatedRoute.data.subscribe(
    //   (data: { delivery: any }) => {

    //    console.log(data.delivery)
       
    //     // this.deliverychartdata = data.delivery[0];

    //     // this.inline = this.deliverychartdata.InLineDelivery / this.deliverychartdata.TotalDelivery;


    //     // console.log(data.delivery);
    //     // this.invoicechartdata = data.delivery[1];

    //     // console.log(this.invoicechartdata);

    //     // this.confirmedinvoices = (this.invoicechartdata.ConfirmedInvoices / this.invoicechartdata.TotalInvoices);
    //     // this.pendinginvoices = (this.invoicechartdata.PendingInvoices / this.invoicechartdata.TotalInvoices);


    //   }
    // )
  }

  
 

  ionViewDidEnter() {
   this.loading.presentChartAnimation().then(()=>{
    this.m.getpart().subscribe((x:any)=>{
      this.userdetails = x.tok;
      this.dataservice.SignedInUser(this.userdetails);
    this.displayname = this.userdetails.displayName;
      this.deliverychartdata = x.del;
      this.invoicechartdata = x.inv;
      this.doughnutChartMethod()
      this.doughnutChartMethod1()
      this.loading.loadingController.dismiss();
  } )
   
   })
   
    
  }
  doughnutChartMethod() {
    this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {
      type: 'doughnut',
      options: {
        responsive:false,
        cutoutPercentage: 60,
        legend : {position:'top',labels:{
          usePointStyle:true,
          fontFamily : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontSize : 10
        },
      }
      },
      data: {
        labels: ['Approved','Pending'] ,
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

      options: {
        responsive:false,
        cutoutPercentage: 60,
        legend : {position:'top',labels:{
          usePointStyle:true,
          fontFamily : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontSize : 10
        },
      }
      },
      data: {
        labels :['INVOICE DISPATCHED','POD CONFIRMED'],
        
        datasets: [{
          
          data: [this.invoicechartdata.ConfirmedInvoices, this.invoicechartdata.PendingInvoices],
      
          backgroundColor: [
            '#fb7800',
            '#4452c6',

          ],

        }]
      }
    });
  }
  // events
  onCLickTo() {
    this.router.navigate(['/invoice', JSON.stringify(this.userdetails)])
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
