import * as SecureLS from 'secure-ls';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class SecureLsService{
    public secureLS: SecureLS;
    constructor(){
        this.secureLS = new SecureLS({encodingType:'aes', isCompression: true});
    }
}