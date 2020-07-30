import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:"root"
})

export class GetService{

 constructor(private http:HttpClient, private route:ActivatedRoute){

 }

 loginResponse(data:string):Observable<any>{
    return this.http.post<any>("http://localhost:52416/api/home" ,data ,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
  
      } );


 }

}