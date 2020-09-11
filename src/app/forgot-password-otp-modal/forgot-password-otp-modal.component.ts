import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotPasswordOTP } from '../models/ForgotPasswordOTP.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastMaker } from '../Toast/ToastMaker.service';
import { Platform, NavParams, ModalController } from '@ionic/angular';
import { GetService } from '../services/getservice.service';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';

@Component({
  selector: 'app-forgot-password-otp-modal',
  templateUrl: './forgot-password-otp-modal.component.html',
  styleUrls: ['./forgot-password-otp-modal.component.scss'],
})
export class ForgotPasswordOtpModalComponent implements OnInit {
  @Input() targetemail: string  ;
  otpform = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    new_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}$')]),
    conf_password: new FormControl('', Validators.required)

  });

  forgotpasswordotp: ForgotPasswordOTP = new ForgotPasswordOTP();
  constructor( private toast: ToastMaker,private modalCtrl:ModalController,public navParams: NavParams, private platform:Platform,private getservice: GetService, private loading: LoadingAnimation,
    ) {
    
   
    this.targetemail = navParams.get('targetemail');
      console.log(this.targetemail);
      
    
   
  }

  ngOnInit() {

  }

  get otp() {
    return this.otpform.get('otp')
  }

  onClickSubmit() {
    this.loading.presentLoading().then(() => {
      this.forgotpasswordotp.EmailAddress = this.targetemail;
      this.forgotpasswordotp.NewPassword = this.otpform.get('new_password').value;
      this.forgotpasswordotp.OTP = this.otpform.get('otp').value;
      this.getservice.changePasswordUsingOTP(this.forgotpasswordotp).subscribe((z: any) => {
        
        this.modalCtrl.dismiss();
        this.loading.loadingController.dismiss()
         
        
      },
        catchError => {
          this.loading.loadingController.dismiss();
          console.log(catchError);


          if (catchError.status == 0) {

            this.toast.internetConnection();
          }
          else if (catchError.status == 400) {
            this.toast.IncorrectOTP();
          }

        }
      )
    })




  }
}
