import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from '../services/getservice.service';
import { TokenResponse } from '../models/TokenResponse.model';
import { catchError } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  fieldTextType=false;
  cred_hidden=true;
  response_data:TokenResponse = new TokenResponse();
  reactive_signin= new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });
constructor(private router:Router,private getService:GetService,public menuCtrl: MenuController) { 
  this.menuCtrl.enable(false, 'main-menu');
}
  ngOnInit(): void {
   
  }



onClickSubmit(){
  
  let temp = "username="+this.reactive_signin.get('username').value+"&password="+this.reactive_signin.get('password').value+"&grant_type=password";

  if(this.reactive_signin.valid){
    this.getService.loginResponse(temp).subscribe((data:any)=>{
      this.response_data=data;
      console.log(data);
      
        this.cred_hidden=true;
     
      this.router.navigate(['/charts' , JSON.stringify(this.response_data)]);
 },
 catchError =>{
  this.cred_hidden=false;
 }
 
 )
  }
  else{
    this.cred_hidden=false;
  }
  
  
}


onClick(){
  
}

showpassword(){
 this.fieldTextType=!this.fieldTextType;
}

}
