import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PopoverController, MenuController} from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from '../services/BehaviourSubject.service';
import { TokenResponse } from '../models/TokenResponse.model';
import { ChangePasswordComponent } from '../ChangePassword/change-password/change-password.component';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  userdetails:TokenResponse;
  displayname:string="name";
  emailaddress:string="email";
  constructor(private router:Router, private dataservice:DataService,public popover:PopoverController,private storage:StorageService,
    public menuCtrl: MenuController, private dialog: MatDialog) { }

  ngOnInit() {
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

  onClickChangePassword(){
    
    const changePasswordConfig= new MatDialogConfig();
   changePasswordConfig.autoFocus = true;
   changePasswordConfig.hasBackdrop = true;
   changePasswordConfig.data ={
     userid: this.userdetails.userID,
     username:this.userdetails.userName
   }
   this.dialog.open(ChangePasswordComponent,changePasswordConfig)

  }
  onClickSignout(){
    this.storage.clear().then(() =>{
      this.router.navigate(['/home']);
      this.popover.dismiss();
    });
  

  
  }

}
