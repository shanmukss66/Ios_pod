import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PopoverController, MenuController} from '@ionic/angular';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private router:Router, public popover:PopoverController,private storage:StorageService,
    public menuCtrl: MenuController) { }

  ngOnInit() {}


  onClickSignout(){
    this.storage.clear().then(() =>{
      this.router.navigate(['/home']);
      this.popover.dismiss();
    });
  

  
  }

}
