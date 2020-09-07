import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePassword } from 'src/app/models/ChangePassword.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/getservice.service';
import { LoadingAnimation } from 'src/app/LoadingAnimation/LoadingAnimation.service';
import { ToastMaker } from 'src/app/Toast/ToastMaker.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changepassword:ChangePassword = new ChangePassword();
  userid;
  username;
  passwordform = new FormGroup({
    current_password: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.required),
    conf_password: new FormControl('',Validators.required)
  });
  constructor(private loading:LoadingAnimation,private toast:ToastMaker,private getservice:GetService,private dialogRef: MatDialogRef<ChangePasswordComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.userid=data.userid;
    this.username=data.username;
   }

  ngOnInit() {}

  onClickSubmit(){
   this.changepassword.UserID=this.userid;
   this.changepassword.UserName=this.username;
   this.changepassword.CurrentPassword=this.passwordform.get('current_password').value;
   this.changepassword.NewPassword=this.passwordform.get('new_password').value;
   this.loading.presentLoading().then(()=>{
    this.getservice.changePassword(this.changepassword).subscribe((z:any)=>{
      console.log(z);
      this.loading.loadingController.dismiss().then(()=>{
        this.dialogRef.close();
      })
     },
     catchError => {
      this.loading.loadingController.dismiss();
      console.log(catchError );
      
      
      if(catchError.status==0){
        
        this.toast.internetConnection();
      }
      else {
        this.toast.incorrectCredentials();
      }
      
    })
   })
  
  
  
  }
}
