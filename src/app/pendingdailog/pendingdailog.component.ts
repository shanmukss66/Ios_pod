import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera, Filesystem } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetService } from '../services/getservice.service';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { Platform, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pendingdailog',
  templateUrl: './pendingdailog.component.html',
  styleUrls: ['./pendingdailog.component.scss'],
})
export class PendingdailogComponent implements OnInit {
  image;
  photo: SafeResourceUrl;
 @Input() qnty: number;
 @Input() headerid: number;
  i = 0;
  j = 0;
  submitclicked=false;
 @Input() createdby: string;
  isfileempty=true;
  form: FormData = new FormData();
  returndata: invUpdateandformdata = new invUpdateandformdata();
  constructor(private sanitizer: DomSanitizer,private file: File ,private modalCtrl:ModalController,private navParam:NavParams) {
    this.qnty = this.navParam.get('qnty');
    this.rcvdqnty = this.qnty;
    this.headerid = this.navParam.get('headerid');
    this.createdby = this.navParam.get('createdby')
    console.log(this.createdby);
    
  }
  selectedFile: File;
  filename: string = "No file";
  a: string = "No";
  reportdate: string = "";
  rcvdqnty: number;
  ngOnInit(): void { 
    
   
  }



  async clickPicture() {
    this.image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    })
    // let blob = b64toBlob(contents.data, "image/jpg", 512);
    
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(this.image && this.image.dataUrl);
   
    
    this.form.append('cam' + this.i, (this.image));
    this.returndata.isfileEmpty = false;
    console.log(this.form.get('cam' + this.i));
    this.i += 1;
    this.a = JSON.stringify(this.i);

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.filename = (this.selectedFile.name).substring(0,12);
    this.form.append(this.selectedFile.name, this.selectedFile, this.selectedFile.name);
    this.returndata.isfileEmpty = false;
    console.log(this.form.get(this.selectedFile.name));
    this.j += 1;

  }

  save() {
    this.submitclicked=true
    
    
     if(this.reportdate!=""){
      this.form.append('HeaderID', this.headerid.toString());
      this.form.append('CreatedBy', this.createdby);
      this.returndata.files = this.form;
      this.returndata.reportdate = this.reportdate;
      // this.dialogRef.close(this.returndata);
      this.modalCtrl.dismiss(this.returndata);
     }
   


  }

}
