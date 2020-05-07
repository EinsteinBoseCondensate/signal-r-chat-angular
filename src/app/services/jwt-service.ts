import * as jwt_decode from "jwt-decode";
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
export class JwtService implements OnInit{
    
    constructor(){

    }
    ngOnInit(){
        setTimeout(async() => {console.log('fucking here')}, 53);
    }
    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }
}