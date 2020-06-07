import * as jwt_decode from "jwt-decode";
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { SecureLsService } from '../helpers/secure-ls';
@Injectable({
    providedIn: 'root',
})
export class JwtService {

    private decoded_token: any;
    
    constructor(private sLS: SecureLsService) {
        this.decoded_token = undefined;
    }
    getDecodedAccessToken(): any {
        try {
            if(!this.decoded_token){
                this.decoded_token = jwt_decode(this.sLS.secureLS.get("Bearer"));
            }
            return this.decoded_token;
        }
        catch (e) {
            return undefined;
        }
    }
    getIdFromToken() {
        try {
            return this.getDecodedAccessToken().nameid;
        } catch (e) {
            return undefined;
        }
    }
    getUserNameFromToken() {
        try {
            return this.getDecodedAccessToken().unique_name;
        } catch (e) {
            return undefined;
        }
    }
    deleteCachedToken(){
        this.decoded_token = undefined;
    }
}
