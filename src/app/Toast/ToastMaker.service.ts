import { Injectable } from "@angular/core";
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn:"root"
})

export class ToastMaker{

    constructor(private toast:ToastController){

    }

    async wentWrong(){
        let tst = this.toast.create({
          message : "Something Went Wrong! Please try Again",
          duration : 3000,
          mode : "md"
        });
        (await tst).present();
        }


    async incorrectCredentials(){
        let tst = this.toast.create({
            message : "Incorrect Credentials! Please try Again",
            duration : 3000,
            mode:"md"

          });
          (await tst).present();
    }    
    
    async internetConnection(){
        let tst = this.toast.create({
            message : "Check your Internet Connection!",
            duration : 3000,
            mode:"md"
          });
          (await tst).present();
    }
    async wentWrongWithUpdatingInvoices(){
        let tst = this.toast.create({
            message : "Something went wrong while updating invoices!",
            duration : 3000,
            mode:"md"
          });
          (await tst).present();
    }
}