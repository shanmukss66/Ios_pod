import { Component, OnInit, Inject } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GetService } from '../services/getservice.service';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-descriptiondailog',
  templateUrl: './descriptiondailog.component.html',
  styleUrls: ['./descriptiondailog.component.scss'],
})
export class DescriptiondailogComponent implements OnInit {
  image;
  photo: SafeResourceUrl;
  qnty:number;
  headerid:number;
   i=0;
   j=0;
  createdby:string="";
  submitclicked=false;
  form:FormData = new FormData();
  returndata:invUpdateandformdata=new invUpdateandformdata();
  constructor(private sanitizer: DomSanitizer,private getservice:GetService,private platform: Platform,private dialogRef: MatDialogRef<DescriptiondailogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
     
      this.headerid = data.headerid;
      console.log(this.headerid);
      
      this.createdby= data.createdby;
      console.log(this.createdby);
      

     }
  selectedFile: File;
  filename:string="No file";
  a:string="No";
  reportdate:string="";
  rcvdqnty:number;
  ngOnInit():void {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.dialogRef.close(null);
    });
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
    this.dialogRef.close(this.returndata);
   }
   
  
 }

}
