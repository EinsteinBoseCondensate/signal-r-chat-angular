import { Directive, ElementRef, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
@Directive({
    selector: '[scrollbottom]'
})
export class ScrollBottomDirective implements OnInit, OnDestroy, OnChanges {

    constructor(public el: ElementRef) {
        el.nativeElement.style.background = 'red';
        console.log('directive built');
    }
    ngOnInit(){
        console.log('directive built');
    }
    ngOnDestroy(){
        
    }
    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
          let chng = changes[propName];
          let cur  = JSON.stringify(chng.currentValue);
          let prev = JSON.stringify(chng.previousValue);
          console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    }

}