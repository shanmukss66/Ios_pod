import { Component, OnInit, Injectable, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera, Filesystem } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetService } from '../services/getservice.service';
import { invUpdateandformdata } from '../models/invUpdateandformdata.model';
import { Platform, NavParams, ModalController } from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx'
import {FilePath} from '@ionic-native/file-path/ngx'
import { ToastMaker } from '../Toast/ToastMaker.service';
import { async } from 'rxjs/internal/scheduler/async';
import {File} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
@Component({
  selector: 'app-pendingdailog',
  templateUrl: './pendingdailog.component.html',
  styleUrls: ['./pendingdailog.component.scss'],
})
export class PendingdailogComponent implements OnInit {
  @ViewChild('filechooser') fileChooserElementRef: ElementRef;
  image;
  photo: SafeResourceUrl;
 @Input() qnty: number;
 @Input() headerid: number;
  i = 0;
  j = 0;
  mimetype:string;
  submitclicked=false;
 @Input() createdby: string;
  isfileempty=true;
  form: FormData = new FormData();
  returndata: invUpdateandformdata = new invUpdateandformdata();
  constructor(private sanitizer: DomSanitizer,private base64: Base64,private webview: WebView,private file:File,private toast:ToastMaker,private filechooser:FileChooser,private filepath:FilePath ,private modalCtrl:ModalController,private navParam:NavParams) {
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

  // private fileReader(file: any) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
     
  //     const blobFile = new Blob([reader.result], { type: file.type });
  //     this.form.append('cam' + this.i+'jpg', blobFile,'cam' + this.i+'jpg');
  //     this.i += 1;
  //      this.a = JSON.stringify(this.i);
  //     // POST formData call
  //     this.returndata.isfileEmpty = false;
  //   };
    
  // }

  async clickPicture() { 
   const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    })
    // let blob = b64toBlob(contents.data, "image/jpg", 512);
    console.log(image);
    
     this.form = new FormData();
     this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
    
    
     const blob = await fetch(image.webPath).then(r=>r.blob())
      
      this.form.append('cam' + this.i+'.png',blob,'cam' + this.i+'.png');
      console.log(blob);
      this.filename="No file"
      this.i=1
       this.a = JSON.stringify(this.i);
      // POST formData call
      this.returndata.isfileEmpty = false;
   
    
   
    
    
    

  }
  
   
async readBuffer(p,f){
  this.file.readAsDataURL(p,f)
}
  
async  onFileChanged() {
 await this.filechooser.open({"mime":"application/pdf,image/png,image/jpg,image/jpeg"}).then( async (fileuri)=>{
   await this.filepath.resolveNativePath(fileuri).then(async (url)=>{
      
        let fn = url.substring(url.lastIndexOf('/')+1);
                let fp = url.substring(0,url.lastIndexOf('/')+1);
        // let mimearr = fn.split('.');
      //  if(mimearr[1]=="jpg"){
      //   this.mimetype = 'image/jpg'
      //  }
      //  else if(mimearr[1]=="jpeg"){
      //   this.mimetype= 'image/jpeg'
      //  }
      //  else if(mimearr[1]=="png"){
      //   this.mimetype= 'image/png'
      //  }
      //  else if(mimearr[1]=="pdf"){
      //   this.mimetype= 'application/pdf'
      //  }else{

      //  }
      

     await this.base64.encodeFile(url).then((base64File: string) => {
        this.toast.fileUri('base64working');
        var binaryVal; 
  
        // mime extension extraction 
        var inputMIME = base64File.split(',')[0].split(':')[1].split(';')[0]; 
        this.toast.fileUri(inputMIME);
        // Extract remaining part of URL and convert it to binary value 
        if (base64File.split(',')[0].indexOf('base64') >= 0) 
            binaryVal = atob(base64File.split(',')[1]); 
  
        // Decoding of base64 encoded string 
        else
            binaryVal = unescape(base64File.split(',')[1]); 
  
        // Computation of new string in which hexadecimal 
        // escape sequences are replaced by the character  
        // it represents 
  
        // Store the bytes of the string to a typed array 
        var blobArray = []; 
        for (var index = 0; index < binaryVal.length; index++) { 
            blobArray.push(binaryVal.charCodeAt(index)); 
        } 


      }, (err) => {
        
      });
         
    // this.file.readAsDataURL(fp,fn).then((str)=>{
    //   let arr=str.split(";");
    //   let arr1 = arr[0].split(":");
    //   let mimetype = arr1[1];
      
    //   this.file.readAsArrayBuffer(fp,fn).then((buffer)=>{
    //     const fileblob= new Blob([buffer],{type:mimetype});
    //     this.form=new FormData();
    //          this.form.append(fn,fileblob,fn);
    //          this.filename=fn;
    //          this.toast.fileExt(fn);
    //          this.a="No"
    //          this.returndata.isfileEmpty = false;
    //   }).catch(e=>  {this.toast.fileUri(JSON.stringify(e));
    //     this.returndata.isfileEmpty = true;
    //   });
    // }).catch(e=>  {this.toast.fileUri(JSON.stringify(e));
    //   this.returndata.isfileEmpty = true;
    // });
    
    
                
               
       
               


        // this.file.readAsDataURL(fpath,fname).then((str)=>{
        //   var arr= str.split(";");
        //   var arr1= arr[0].split(":");
        //   var mimetype= arr[1];
        //   (<any>window).resolveLocalFileSystemURL(url,(fileEntry)=>{
        //     fileEntry.file((resFile)=>{
        //       var reader= new FileReader();
              
        //       reader.onloadend=(evt:any)=>{
        //         var blob:any = new Blob([evt.target.result],{type:mimetype})
        //         this.form=new FormData();
        //         this.form.append(fname,blob,fname);
        //         this.filename=fname;
        //         this.a="No"
        //         this.returndata.isfileEmpty = false;
        //       }
        //       reader.onerror = (e) => {
        //        // console.log('Failed file read: ' + e.toString());
        //         this.toast.fileUri(e.toString());
        //       };
        //       reader.readAsArrayBuffer(resFile);
        //     })
        //   })
        // })
        // const blob = await fetch(fileuri).then(r=>r.blob());
        // let t = l[l.length-1].split('.');
        // if(t[t.length-1]=="pdf"){
        //   const blob = new Blob([fileuri],);
        // }
        // else if()
        // this.toast.fileUri(fileuri);
        // this.form=new FormData();
        // this.form.append(l[l.length-1],fileuri,l[l.length-1])
        // this.filename = (l[l.length-1]).substring(0,12);
        // this.a="No"
        // this.returndata.isfileEmpty = false;
      }).catch(e=>  {this.toast.ErrorUploading();
        this.returndata.isfileEmpty = true;
      })
      
      
      
    }).catch(e =>{this.toast.ErrorOpeningExplr()
      this.returndata.isfileEmpty = true;
    })
    // this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    // this.form=new FormData();
    // this.filename = (this.selectedFile.name).substring(0,12);
    // this.form.append(this.selectedFile.name, this.selectedFile, this.selectedFile.name);
    // this.returndata.isfileEmpty = false;
    // console.log(this.form.get(this.selectedFile.name));
    // this.a="No"
    // this.j = 1;

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
