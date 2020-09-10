import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingController, Platform } from '@ionic/angular';
import { LoadingAnimation } from 'src/app/LoadingAnimation/LoadingAnimation.service';
import { DescriptiondailogComponent } from 'src/app/descriptiondailog/descriptiondailog.component';
import { ToastMaker } from 'src/app/Toast/ToastMaker.service';
import { ForgotPasswordOTP } from 'src/app/models/ForgotPasswordOTP.model';
import { GetService } from 'src/app/services/getservice.service';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.scss'],
})
export class ForgotPasswordOTPComponent implements OnInit {

  otpform = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    new_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}$')]),
    conf_password: new FormControl('', Validators.required)

  });
  target_email: string = "";
  forgotpasswordotp: ForgotPasswordOTP = new ForgotPasswordOTP();
  constructor(private dailog: MatDialog, private toast: ToastMaker, private platform:Platform,private getservice: GetService, private loading: LoadingAnimation, private dialogRef: MatDialogRef<ForgotPasswordOTPComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data.email);

    this.target_email = data.email;
    this.platform.backButton.subscribe(()=>{
      this.dialogRef.close();
    })
  }

  ngOnInit() {

  }

  get otp() {
    return this.otpform.get('otp')
  }

  onClickSubmit() {
    this.loading.presentLoading().then(() => {
      this.forgotpasswordotp.EmailAddress = this.target_email;
      this.forgotpasswordotp.NewPassword = this.otpform.get('new_password').value;
      this.forgotpasswordotp.OTP = this.otpform.get('otp').value;
      this.getservice.changePasswordUsingOTP(this.forgotpasswordotp).subscribe((z: any) => {
        this.loading.loadingController.dismiss().then(() => {
          this.dialogRef.close();
        })
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
