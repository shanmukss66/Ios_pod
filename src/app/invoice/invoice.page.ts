import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenResponse } from '../models/TokenResponse.model';
import { InvoiceHeaderDetail } from '../models/InvoiceHeaderDetail.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
 button;
 approvedinvoicedata:InvoiceHeaderDetail [];
 pendinginvoicedata:InvoiceHeaderDetail [];
 segment=0;
 ewaybillno:string="";
 userdetails:TokenResponse = new TokenResponse();
 @ViewChild('slides', { static: true }) slider: IonSlides;  
  constructor(private alertController:AlertController, private router:Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userdetails = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_data'));
   this.activatedRoute.data.subscribe((x :{pending:any})=>{
    console.log(x.pending);
    this.pendinginvoicedata=x.pending;
    
   })
   this.activatedRoute.data.subscribe((y:{approved:any})=>{
     console.log(y.approved);
     this.approvedinvoicedata=y.approved;
     
   })
  }


  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.segment);  
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
  }  
   
  
  

 async handleButtonClick(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    
    inputs:[{
      name:'date',
      type:'text',
      
      label:'Vital Report Date:',
      value:'23/06/2020'
    }
  ,{
      name:'quantity',
      type:'text',
      placeholder:'Received Quantity',
      
  },
  {
    name:'quantity',
    type:'text',
    placeholder:'Reason',
    
}  ,
{
  name:'quantity',
  type:'text',
  placeholder:'Remark',
  
  
}  

  ],
buttons:[{
  text:'Scan',
  cssClass:'scan-btn',
  
  
},
{
  text:'Invoice Details',
  cssClass:'invoice-btn'
},
{
  text:'submit',
  cssClass:'submit'
}

]  


  })
  await alert.present();  
  }


  onClicknavigate(x){
     this.router.navigate(['/description' ,JSON.stringify(this.userdetails) , JSON.stringify(x)  ])
  }
}
