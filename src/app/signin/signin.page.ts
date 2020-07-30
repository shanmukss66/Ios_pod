import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetService } from '../services/getservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  reactive_signin= new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)

    });
  constructor(private router:Router,private getService:GetService) { }

  ngOnInit() {
  }

  onClickSubmit(){
    // let temp = "username="+this.reactive.get('username').value+"&password="+this.reactive.get('password').value+"&grant_type=password";
    // this.getService.loginResponse(temp).subscribe((data)=>{
    //       console.log(data);
    // })
    console.log("hello");
    
  }
  onClick(){
    this.router.navigate(['/charts'])
  }
}
