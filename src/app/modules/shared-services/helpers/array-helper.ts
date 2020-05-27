import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ArrayHelper{
    constructor(){}
    replaceAll(col: string, toReplaceOcurrence: string, newElement: string){
        while(col.indexOf(toReplaceOcurrence) != -1){
            col.replace(toReplaceOcurrence, newElement);
        }
        return col;
    }
}