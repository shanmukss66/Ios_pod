import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { Chart } from 'chart.js';
import {Router} from '@angular/router'
import { MultiDataSet, Label } from 'ng2-charts';
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
  

  constructor(private router:Router) { }

  ngOnInit() {
   
  }
   
  ionViewDidEnter() {
    this.doughnutChartMethod();
    this.doughnutChartMethod1();
  }
  doughnutChartMethod() {
    this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement,{
      type: 'doughnut',
      options:{
        
        cutoutPercentage:60,
        
      },
      data: {
       
        datasets: [{
          label: '# of Votes',
          data: [50, 29],
          backgroundColor: [
            
            '#52de97',
            '#eff54f',
            
          ],
          
        }]
      }
    });
  }

  doughnutChartMethod1() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement,{
      type: 'doughnut',
      
      options:{
        
        cutoutPercentage:60,
        
      },
      data: {
       
        datasets: [{
          
          data: [50, 29],
          
          backgroundColor: [
            '#fb7800',
            '#4452c6',
            
          ],
          
        }]
      }
    });
  }
  // events
  onCLickTo(){
    this.router.navigate(['/invoice'])
  }
}
