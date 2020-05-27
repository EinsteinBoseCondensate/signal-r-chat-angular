import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/Backend/user-lazy-loaded';

@Component({
  selector: 'app-chat-row',
  templateUrl: './chat-row.component.html',
  styleUrls: ['./chat-row.component.scss']
})
export class ChatRowComponent implements OnInit {
@Input() Group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
