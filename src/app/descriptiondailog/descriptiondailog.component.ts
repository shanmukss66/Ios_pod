import { Component, OnInit, Inject, Input } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GetService } from '../services/getservice.service';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { Platform, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-descriptiondailog',
  templateUrl: './descriptiondailog.component.html',
  styleUrls: ['./descriptiondailog.component.scss'],
})
export class DescriptiondailogComponent implements OnInit {
  image;
  photo: SafeResourceUrl;
  qnty:number;
 @Input() headerid:number;
   i=0;
   j=0;
 @Input() createdby:string="";
  submitclicked=false;
  form:FormData = new FormData();
  returndata:invUpdateandformdata=new invUpdateandformdata();
  constructor(private sanitizer: DomSanitizer,private platform: Platform,private modalCtrl:ModalController,private navParam:NavParams) {
     
      this.headerid = this.navParam.get('headerid');
      console.log(this.headerid);
      
      this.createdby= this.navParam.get('createdby');
      console.log(this.createdby);
     

     }
  selectedFile: File;
  filename:string="No file";
  a:string="No";
  reportdate:string="";
  rcvdqnty:number;
  ngOnInit():void {
    
  }

  

  async clickPicture() {
    this.image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    })
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(this.image && this.image.dataUrl);
    this.form.append('cam'+this.i,JSON.stringify(this.photo));
    this.returndata.isfileEmpty = false;
    console.log(this.image);
    this.i+=1;
    this.a= JSON.stringify(this.i);
    
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.filename=(this.selectedFile.name).substring(0,12);    
    this.form.append(this.selectedFile.name,this.selectedFile,this.selectedFile.name);
    this.returndata.isfileEmpty = false;
    console.log(this.form.get(this.selectedFile.name));
    this.j+=1;
    
    
  }
  
 save(){
  this.submitclicked=true;

   if(this.reportdate!=""){
    this.form.append('HeaderID',this.headerid.toString());
    this.form.append('CreatedBy',this.createdby);
    this.returndata.reportdate=this.reportdate;
    this.returndata.files=this.form;
    this.modalCtrl.dismiss(this.returndata)
   }
   
  
 }

}
