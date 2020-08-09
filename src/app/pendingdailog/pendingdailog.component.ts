import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GetService } from '../services/getservice.service';

@Component({
  selector: 'app-pendingdailog',
  templateUrl: './pendingdailog.component.html',
  styleUrls: ['./pendingdailog.component.scss'],
})
export class PendingdailogComponent implements OnInit {
  image;
  photo: SafeResourceUrl;
  qnty:number;
  headerid:number;
   i=0;
   j=0;
  createdby:string;
  form:FormData = new FormData();
  constructor(private sanitizer: DomSanitizer,private getservice:GetService,private dialogRef: MatDialogRef<PendingdailogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.qnty=data.qnty;
      this.rcvdqnty=this.qnty;
      this.headerid = data.headerid;
      this.createdby= data.createdby

     }
  selectedFile: File;
  filename:string="No file";
  a:string="No";
  reportdate:string="";
  rcvdqnty:number;
  ngOnInit():void {}

  

  async clickPicture() {
    this.image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    })
    this.form.append('cam'+this.i,this.image,'cam'+this.i);
    console.log(this.image);
    this.i+=1;
    this.a= JSON.stringify(this.i);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(this.image && this.image.dataUrl);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.filename=this.selectedFile.name;    
    this.form.append(this.selectedFile.name,this.selectedFile,this.selectedFile.name);
    console.log(this.form.get('img'+this.j));
    this.j+=1;
    
  }
  
 save(){
   this.form.append('HeaderID',this.headerid.toString());
   this.form.append('CreatedBy',this.createdby)
   this.getservice.addInvoiceAttachment(this.form).subscribe((x:any)=>{
     console.log(x);
     this.dialogRef.close(this.reportdate);
     
   })
  
 }

}
