import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  rowHeight:string;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  items :string[];
  floatLabelControl = new FormControl('always');
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
   }
  
  ngOnInit(): void {
    this.refreshWindowHeight();
    window.addEventListener('resize', this.refreshWindowHeight );
    this.items = [...Array(1500).keys()].map(each => each.toString());
  }
  refreshWindowHeight(): void{
    this.rowHeight = ((window.innerHeight)*0.9/16).toString();
  }

}
