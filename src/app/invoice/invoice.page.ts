import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
 button;
 data=[];
  constructor(private alertController:AlertController, private router:Router ) { }

  ngOnInit() {
   this.data=[{
      'key1':"hello",
      'key2': "surya"
    },
    {
     'key1':"hai",
     'key2': "sriram"
    }
   ]
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


  onClicknavigate(){
     this.router.navigate(['/description'])
  }
}
