import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController, ToastController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenResponse } from './models/TokenResponse.model';
import { DataService } from './services/BehaviourSubject.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { ToastMaker } from './Toast/ToastMaker.service';
import { LoadingAnimation } from './LoadingAnimation/LoadingAnimation.service';
import { async } from '@angular/core/testing';
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
    private loading:LoadingAnimation
    
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    
        
        this.getUserFromBehaviourSubject();
        
        
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(0,async ()=>{
         if(this.router.url =="/charts" || this.router.url ==""){
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
        if(this.routeroutlet && this.routeroutlet.canGoBack()){
          this.routeroutlet.pop();
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
      
      this.router.navigate(['/charts'])
        this.loadingController.dismiss();
       
      
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

 

  
 
}
