import { Injectable, OnInit } from '@angular/core';

import { DataService } from './BehaviourSubject.service';
import { TokenResponse } from '../models/TokenResponse.model';
import { StorageService } from './storage.service';
import { Plugins } from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userdetails:TokenResponse = new TokenResponse()
   
    
  constructor(private dataservice:DataService,private storage:StorageService) {
   
  
   
  }
  
  // ...
  public async isAuthenticated(): Promise<boolean> {
   
  
 
    // Check whether the token is expired and return
    // true or false
    this.userdetails = await JSON.parse((await Plugins.Storage.get({key:'signedUser'})).value)
    
    
    if(this.userdetails !=null){
      console.log(this.userdetails);
      console.log("forst");
      
      return true;
    }
    else{
      return false;
    }
  }

 
  
}