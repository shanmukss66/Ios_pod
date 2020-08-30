import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from '../services/getservice.service';
import { TokenResponse } from '../models/TokenResponse.model';
import { catchError } from 'rxjs/operators';
import { MenuController, ToastController } from '@ionic/angular';
import { DataService } from '../services/BehaviourSubject.service';
import { StorageService } from '../services/storage.service';
import { LoadingController } from '@ionic/angular';
import { ToastMaker } from '../Toast/ToastMaker.service';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  fieldTextType = false;
  
  response_data: TokenResponse = new TokenResponse();
  reactive_signin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });
  constructor(private router: Router,private loading:LoadingAnimation ,private toast:ToastMaker,public loadingController: LoadingController, private dataservice: DataService, private getService: GetService, public menuCtrl: MenuController, private storage: StorageService) {
    this.dataservice.SignedInUser(this.response_data)
    this.menuCtrl.swipeGesture(false);
  }
  ngOnInit(): void {

  }
  


  onClickSubmit() {
    this.loading.presentLoading().then(() => {
      let temp = "username=" + this.reactive_signin.get('username').value + "&password=" + this.reactive_signin.get('password').value + "&grant_type=password";

      if (this.reactive_signin.valid) {
        this.getService.loginResponse(temp).subscribe((data: any) => {
          this.response_data = data;
          

         
          this.storage.setObject('signedUser', this.response_data);
          
          this.dataservice.SignedInUser(this.response_data);
          
          this.router.navigate(['/charts']);
          this.loadingController.dismiss();
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


  

  showpassword() {
    this.fieldTextType = !this.fieldTextType;
  }

}
