import { Injectable } from "@angular/core";
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn : "root"
})

export class LoadingAnimation{

    constructor(public loadingController:LoadingController){

    }



    async presentLoading() {
        const loading = await this.loadingController.create({
          mode: "md",
          message: 'Please wait...'
    
        });
        await loading.present();
      }
}