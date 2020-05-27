import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ChatService } from '../../services/chatService';
import { Guid } from 'guid-typescript';
import { Group, Message } from 'src/app/models/Backend/user-lazy-loaded';
import { AuthService } from 'src/app/modules/shared-services/auth/authService';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})

export class ChatsComponent implements OnInit, OnDestroy {
  messages: Message[];
  currentGroup: Group;
  options: FormGroup;  
  hideRequiredControl = new FormControl(false);
  items: Group[];
  hintResults: SearchUser[];
  shoudShowSearchResult: boolean;
  secureLS: any;
  floatLabelControl = new FormControl('always');
  constructor(fb: FormBuilder, private chatService: ChatService,
    private authService: AuthService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.chatService.onConversationSummoned.subscribe((data: Group) => this.onConversationSummonedHandler(data));    
    this.chatService.onConversationCreation.subscribe((data: Group) => this.onConversationCreationHandler(data));
    this.items = this.authService.sLS.secureLS.get("IL").groups;
    console.log(JSON.stringify(this.items));
  }
  onConversationSummonedHandler(data: Group){

  }
  onConversationCreationHandler(data: Group){

  }
  submitMessage(cm: string): void {
    let msg: chatmsg;
    msg.msg = cm;
    msg.groupId = this.currentGroup.id;

    this.chatService.sendMessage(msg);
  }
  

  switchConversation(group: Group){
    this.currentGroup = group;
    this.messages = [...group.messageUsers.filter((mu) => mu.realMsg.isMine).map(item => item.realMsg)];
  }
  isMine(msg: Message){
    return msg.creatorName == this.authService.jwtService.getUserNameFromToken();
  }
}



export interface chatmsg {
  msg: string,
  groupId: Guid
}



export interface SearchUser{
  username: string
}
export interface SearchUserRequest{
  NameFragment: string,
SkippingResults: number

}
