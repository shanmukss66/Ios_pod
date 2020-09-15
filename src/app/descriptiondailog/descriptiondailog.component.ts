import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GetService } from '../services/getservice.service';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { Platform, NavParams, ModalController } from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx'
import {FilePath} from '@ionic-native/file-path/ngx'
import { ToastMaker } from '../Toast/ToastMaker.service';
@Component({
  selector: 'app-descriptiondailog',
  templateUrl: './descriptiondailog.component.html',
  styleUrls: ['./descriptiondailog.component.scss'],
})
export class DescriptiondailogComponent implements OnInit {
  @ViewChild('filechooser') fileChooserElementRef: ElementRef;
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
  constructor(private sanitizer: DomSanitizer,private toast:ToastMaker,private filechooser:FileChooser,private filepath:FilePath,private platform: Platform,private modalCtrl:ModalController,private navParam:NavParams) {
     
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
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    })
    this.form= new FormData;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.webPath);
    const blob = await fetch(image.webPath).then(r=>r.blob())
      
    this.form.append('cam' + this.i+'jpg',blob,'cam' + this.i+'.jpg');
    console.log("hello");
    this.filename="No file"
    this.i = 1;
     this.a = JSON.stringify(this.i);
    // POST formData call
    this.returndata.isfileEmpty = false;
    
  }

async onFileChanged() {
    await  this.filechooser.open({"mime":"application/pdf,image/png,image/jpg,image/jpeg"}).then((fileuri)=>{
      this.filepath.resolveNativePath(fileuri).then(async(url)=>{
        let l = url.split('/');
        this.toast.fileExt(l[l.length-1]);
          
        // const blob = await fetch(fileuri).then(r=>r.blob());
        const blob = new Blob([fileuri])
        this.form=new FormData();
        this.form.append(l[l.length-1],blob,l[l.length-1])
        this.filename = (l[l.length-1]).substring(0,12);
        this.a="No"
        this.returndata.isfileEmpty = false;
      }).catch(e=> {this.toast.ErrorUploading()
        this.returndata.isfileEmpty = true;
      })
      
      
      
    }).catch(e =>{this.toast.ErrorOpeningExplr()
      this.returndata.isfileEmpty = true
      ;
    })
    // this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    // this.form=new FormData();
    // this.filename=(this.selectedFile.name).substring(0,12);    
    // this.form.append(this.selectedFile.name,this.selectedFile,this.selectedFile.name);
    // this.returndata.isfileEmpty = false;
    // console.log(this.form.get(this.selectedFile.name));
    // this.a="No"
    // this.j=1;
    
    
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
