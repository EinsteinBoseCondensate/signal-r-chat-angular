import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/Backend/user-lazy-loaded';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }
  @Input() msg: Message;
  
  ngOnInit(): void {
  }

}
