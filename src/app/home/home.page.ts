import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetService } from '../services/getservice.service';
import { TokenResponse } from '../models/TokenResponse.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  response_data:TokenResponse = new TokenResponse();
  reactive_signin= new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });
constructor(private router:Router,private getService:GetService) { }
  ngOnInit(): void {
   
  }



onClickSubmit(){
  let temp = "username="+this.reactive_signin.get('username').value+"&password="+this.reactive_signin.get('password').value+"&grant_type=password";
  this.getService.loginResponse(temp).subscribe((data:TokenResponse)=>{
       this.response_data=data;
       console.log(this.response_data);
       this.router.navigate(['/charts' , JSON.stringify(this.response_data)]);
  })
  
  
}
onClick(){
  
}

}
