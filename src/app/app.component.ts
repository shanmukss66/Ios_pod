import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenResponse } from './models/TokenResponse.model';
import { DataService } from './services/BehaviourSubject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userdetails:TokenResponse;
  displayname:string="name";
  emailaddress:string="email";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataservice:DataService,
    private router:Router
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    this.dataservice.user.subscribe((data:TokenResponse) =>{
      if(data!=null){
        this.userdetails= data;
        this.displayname=this.userdetails.displayName;
        this.emailaddress=this.userdetails.emailAddress;
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  onclickCharts(){
   this.router.navigate(['/charts' , JSON.stringify(this.userdetails)]);
  }

  onclickInvoice(){
    this.router.navigate(['/invoice' , JSON.stringify(this.userdetails)]);
  }
}
