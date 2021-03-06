import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController, ToastController, IonRouterOutlet, AlertController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenResponse } from './models/TokenResponse.model';
import { DataService } from './services/BehaviourSubject.service';
import { Router, NavigationStart } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { ToastMaker } from './Toast/ToastMaker.service';
import { LoadingAnimation } from './LoadingAnimation/LoadingAnimation.service';
import { async } from '@angular/core/testing';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet,{static:true}) routeroutlet:IonRouterOutlet
  userdetails:TokenResponse;
  displayname:string="name";
  emailaddress:string="email";
  urlcurrent:string="";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataservice:DataService,
    private router:Router,
    private storage:StorageService,
    private alrtctrl:AlertController,
    public loadingController: LoadingController,
    private toast:ToastMaker,
    private loading:LoadingAnimation,
    private location:PlatformLocation,
    private modalController:ModalController
   
    
  ) {
    this.initializeApp();
   this.location.onPopState(async ()=>{
     const modal = await this.modalController.getTop();
     if(modal){
       modal.dismiss();
     }
   })
  }
  ngOnInit(): void {
    
        
        this.getUserFromBehaviourSubject();
        
        
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(0,async ()=>{
      
        
        
       
      
        if(this.router.url ==="/home" ){
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
        }
       else if(this.router.url.split('/')[1]==='charts'){
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
       } 
      else if(this.routeroutlet.canGoBack() ){
          this.loading.presentLoading().then(()=>{
           this.routeroutlet.pop().then(()=>{
             this.loadingController.dismiss();
           });
          })
           
         }
        
      })

    });
  }
  getUserFromBehaviourSubject(){
  
  this.dataservice.user.subscribe((data:TokenResponse)=>{
     if(data!=null){
      this.userdetails=data;
      if(this.userdetails.displayName!=null){
        this.displayname = this.userdetails.displayName;
      }
      if(this.userdetails.emailAddress!=null){
        this.emailaddress=this.userdetails.emailAddress;
      }
     }

  })
  
  
 }

 

  onclickCharts(){
    
    this.loading.presentLoading().then(() =>{
      
      this.router.navigate(['charts',JSON.stringify(this.userdetails)]).then(()=>{
        this.loadingController.dismiss();
      })
        
       
      
    })
   
   
   
  }

  onclickInvoice(){ 
    this.loading.presentLoading().then(()=>{
      try {
        this.router.navigate(['/invoice' , JSON.stringify(this.userdetails),0]).then(()=>{
          this.loadingController.dismiss();
        })
         
          
      
      } catch (error) {
        this.loadingController.dismiss();
        this.toast.wentWrong();
      }
     
       
    })
    
    
     
  }


  onclickOntimeAnLate(){ 
    this.loading.presentLoading().then(()=>{
      try {
        this.router.navigate(['/on-time-and-late-invs', JSON.stringify(this.userdetails),0]).then(()=>{
          this.loadingController.dismiss();
        })
         
          
      
      } catch (error) {
        this.loadingController.dismiss();
        this.toast.wentWrong();
      }
     
       
    })
    
    
     
  }

 

  
 
}
