import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/Backend/user-lazy-loaded';
import { JwtService } from 'src/app/modules/shared-services/auth/jwt-service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private jwtService: JwtService) { }
  @Input() msg: Message;
  userName
  ngOnInit(): void {
  }

}
