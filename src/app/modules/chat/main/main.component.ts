import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    document.querySelector(".mat-tab-body-wrapper").setAttribute("style", "height:100%;");
    console.log(`AfterViewInit: ${document.querySelector(".mat-tab-body-wrapper")}`);
    console.log(document.querySelector(".mat-tab-body-wrapper"));
  }

  ngOnInit(): void {
    document.querySelector(".mat-tab-body-wrapper").setAttribute('style', 'height:100%;');
    console.log(`OnInit: ${document.querySelector(".mat-tab-body-wrapper")}`);
    console.log(document.querySelector(".mat-tab-body-wrapper"));
  }

}
