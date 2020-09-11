import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from '../services/getservice.service';
import { TokenResponse } from '../models/TokenResponse.model';
import { catchError } from 'rxjs/operators';
import { MenuController, ToastController, Platform, AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/BehaviourSubject.service';
import { StorageService } from '../services/storage.service';
import { LoadingController } from '@ionic/angular';
import { ToastMaker } from '../Toast/ToastMaker.service';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../ForgotPassword/forgot-password/forgot-password.component';
import { ForgotPasswordOTPComponent } from '../ForgotPassword/forgot-password-otp/forgot-password-otp.component';
import { SigninPage } from '../signin/signin.page';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { ForgotPasswordOtpModalComponent } from '../forgot-password-otp-modal/forgot-password-otp-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  fieldTextType = false;
  target_email:string="";
  response_data: TokenResponse = new TokenResponse();
  reactive_signin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });
  constructor(private router: Router, private alrtctrl:AlertController,private modalController:ModalController,private dialog: MatDialog,private platform:Platform,private loading:LoadingAnimation ,private toast:ToastMaker,public loadingController: LoadingController, private dataservice: DataService, private getService: GetService, public menuCtrl: MenuController, private storage: StorageService) {
    this.dataservice.SignedInUser(this.response_data)
    
    
    
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
  ngOnInit(): void {
    
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }
  onClickForgotPassword(){
   const forgotpasswordConfig=new MatDialogConfig();
   forgotpasswordConfig.autoFocus=true;
   forgotpasswordConfig.hasBackdrop=true;

   const forgotpasswordOTP = new MatDialogConfig();
   forgotpasswordOTP.autoFocus=true;
   forgotpasswordOTP.hasBackdrop =true;
   
   
  const emailformComp  = this.dialog.open(ForgotPasswordComponent,forgotpasswordConfig);
   emailformComp.afterClosed().subscribe((z:any)=>{
     forgotpasswordOTP.data={
       email:z
     }
     this.loading.presentLoading().then(()=>{
       this.target_email=z;
      if(this.target_email!=null){
        this.getService.sendEmailforOTP(this.target_email).subscribe((x:any)=>{
          this.loading.loadingController.dismiss().then(()=>{
            this.dialog.open(ForgotPasswordOTPComponent,forgotpasswordOTP)  
          })
          
         },
            
              catchError => {
                this.loadingController.dismiss();
                console.log(catchError);
                
                
                if(catchError.status==0){
                  
                  this.toast.internetConnection();
                }
                else if(catchError.status==400){
                  this.toast.wentWrong();
                }
                
              }
         )
      }
      else{
        this.loadingController.dismiss();
      }
     })
     
     
     
   })
  }

  onClickSubmit() {
    this.loading.presentLoading().then(() => {
     
      let temp = "username=" + this.reactive_signin.get('username').value + "&password=" + this.reactive_signin.get('password').value + "&grant_type=password";

      if (this.reactive_signin.valid) {
        this.getService.loginResponse(temp).subscribe((data: any) => {
          this.response_data = data;
          

         
          this.storage.setObject('signedUser', this.response_data);
          
          this.dataservice.SignedInUser(this.response_data);
          
          this.router.navigate(['charts',JSON.stringify(this.response_data)]).then(()=>{
            this.loadingController.dismiss()
          })
            this.toast.loginsuccess();
          
          
        },
        
          catchError => {
            this.loadingController.dismiss();
            console.log(catchError );
            
            
            if(catchError.status==0){
              
              this.toast.internetConnection();
            }
            else if(catchError.status==400){
              this.toast.incorrectCredentials();
            }
            
          }

        )
      }
      else {
        this.loadingController.dismiss();
        this.toast.incorrectCredentials();
      }
    });



  }

 async onlclickForgotPasswordModal(){
     const modal = await this.modalController.create({
       component:ForgotPasswordModalComponent,
       cssClass:"forgot-password-modal"
     })
    await modal.present();
     const {data} = await modal.onWillDismiss();
     console.log(data);
     this.target_email=data;
     this.loading.presentLoading().then(()=>{
      
     if(this.target_email!=null){
       this.getService.sendEmailforOTP(this.target_email).subscribe((x:any)=>{
         this.loading.loadingController.dismiss().then(()=>{
           this.onlclickOTPModal();
         })
         
        },
           
             catchError => {
               this.loadingController.dismiss();
               console.log(catchError);
               
               
               if(catchError.status==0){
                 
                 this.toast.internetConnection();
               }
               else if(catchError.status==400){
                 this.toast.wentWrong();
               }
               
             }
        )
     }
     else{
       this.loadingController.dismiss();
     }
    })
     
  }
 async onlclickOTPModal(){
    const OTPmodal = await this.modalController.create({
     component:ForgotPasswordOtpModalComponent,
     cssClass:"OTP-password-modal",
     componentProps:{'targetemail':this.target_email}
    })
    return await OTPmodal.present();
  }
  

  showpassword() {
    this.fieldTextType = !this.fieldTextType;
  }

}
