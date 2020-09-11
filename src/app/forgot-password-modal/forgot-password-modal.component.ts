import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
})
export class ForgotPasswordModalComponent implements OnInit {

  emailform:FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private modalCtrl:ModalController) {
   
   }

  ngOnInit() {
    this.emailform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get f() { return this.emailform.controls; }

  onClickSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.emailform.invalid) {
        return;
    }
    else{
     
      this.modalCtrl.dismiss(this.emailform.get('email').value);
    
    }
  }

}
