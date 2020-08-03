import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router'
import { MultiDataSet, Label } from 'ng2-charts';
import { TokenResponse } from '../models/TokenResponse.model';
import { InvoiceStatusCount } from '../models/InvoiceStatusCount.model';
import { DeliveryCount } from '../models/DeliveryCount.model';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvas1') doughnutCanvas1;
  doughnutChart: any;
  doughnutChart1: any;
  userdetails: TokenResponse = new TokenResponse();
  displayname: string = "";
  invoicechartdata: InvoiceStatusCount = new InvoiceStatusCount();
  deliverychartdata: DeliveryCount = new DeliveryCount();

  confirmedinvoices: number;
  pendinginvoices: number;
  inlinedelvery: number;
  delayeddelivery: number;
  inline: number;
  b: InvoiceStatusCount | DeliveryCount;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
    console.log(this.userdetails);
    this.displayname = this.userdetails.displayName;
    this.activatedRoute.data.subscribe(
      (data: { invoice: any }) => {


        this.invoicechartdata = data.invoice;

        console.log(this.invoicechartdata);

        this.confirmedinvoices = (this.invoicechartdata.ConfirmedInvoices / this.invoicechartdata.TotalInvoices);
        this.pendinginvoices = (this.invoicechartdata.PendingInvoices / this.invoicechartdata.TotalInvoices);


      }
    )

    this.activatedRoute.data.subscribe(
      (data: { delivery: any }) => {


        this.deliverychartdata = data.delivery;

        this.inline = this.deliverychartdata.InLineDelivery / this.deliverychartdata.TotalDelivery;


        console.log(data.delivery);

      }
    )
  }

  ionViewDidEnter() {
    this.doughnutChartMethod();
    this.doughnutChartMethod1();
  }
  doughnutChartMethod() {
    this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {
      type: 'doughnut',
      options: {

        cutoutPercentage: 60,

      },
      data: {

        datasets: [{
          label: '# of Votes',
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
        responsive:true,
        cutoutPercentage: 60,

      },
      data: {

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
}
