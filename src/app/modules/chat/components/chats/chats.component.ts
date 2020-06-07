import { Component, OnInit, OnDestroy, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef, AfterContentChecked, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ChatService } from '../../services/chatService';
import { Guid } from 'guid-typescript';
import { Group, Message, MessageUser, InitialLoad, User } from 'src/app/models/Backend/user-lazy-loaded';
import { AuthService } from 'src/app/modules/shared-services/auth/authService';
import { GuidTuple } from 'src/app/models/Backend/ack-messages';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})

export class ChatsComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {
  ngAfterContentChecked(){
    if(this.chatService.isNavigation()){
      this.cdRef.detectChanges();
      this.switchConversation(this.chatService.getNavigatingToGroup());
      this.chatService.resetNavigationFlags();     
      this.cdRef.detectChanges();
      return;
    }
    
  }
  @ViewChildren('allTheseThings') things: QueryList<any>;
  ngAfterViewInit() {
    console.log('\n\n\n\n\n\nEntering ngAfterViewInit \n\n\n\n\n');
    this.things.changes.subscribe(t => {
      console.log('\n\n\n\n\n\n scrolling bottom \n\n\n\n\n');
      this.scrollBottom();     
    });    


    
  }
  messages: Message[];
  currentContent: string;
  currentGroup: Group;

  options: FormGroup;
  hideRequiredControl = new FormControl(false);

  items: Group[];
  hintResults: SearchUser[];
  shoudShowSearchResult: boolean;
  floatLabelControl = new FormControl('always');
  constructor(fb: FormBuilder, private chatService: ChatService,
    private cdRef:ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private appRef: ApplicationRef) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.chatService.onConversationSummoned.subscribe((data: Group) => this.onConversationSummonedHandler(data));
    this.chatService.onConversationCreation.subscribe((data: Group) => this.onConversationCreationHandler(data));
    this.chatService.onMessageSubmittedOk.subscribe((tuple: GuidTuple) => this.onMessageSubmittedOkHandler(tuple));
    this.chatService.onMessageReceived.subscribe((data: any) => this.messageReceivedHandler(data));
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.items = this.authService.sLS.secureLS.get("IL").groups;
  }
  messageReceivedHandler(data: any){
    console.log(JSON.stringify(data));
    this.items.find(i => i.id == data.groupId).messageUsers.push({ realMsg: (data.messageUI as Message), user: ({id: data.creatorGroupUserId, userName : data.messageUI.creatorName} as User), pendingSend: false, pendingReceive: false } as MessageUser);
    if(data.groupId == this.currentGroup.id){
      this.messages.push(data.messageUI);
    }
    let il = this.authService.sLS.secureLS.get("IL") as InitialLoad;
    il.groups.find(g => g.id == data.groupId).messageUsers.push({ realMsg: (data.messageUI as Message), user: ({id: data.creatorGroupUserId, userName : data.messageUI.creatorName} as User), pendingSend: false, pendingReceive: false } as MessageUser)
    this.authService.sLS.secureLS.set("IL",il);
  }
  onMessageSubmittedOkHandler(tuple: GuidTuple) {
    let il = this.authService.sLS.secureLS.get("IL") as InitialLoad;
    let group = il.groups.find(g => g.id == tuple.groupId);
    let message = group.messageUsers.find(mu => mu.realMsg.id == tuple.msgId).realMsg;
    il.groups.find(g => g.id == tuple.groupId).groupUsers.filter(gu => gu.id != this.authService.getUser().id).forEach(u => group.messageUsers.push({ realMsg: (message as Message), user: (u as User), pendingSend: false, pendingReceive: true } as MessageUser));
    il.groups.find(g => g.id == tuple.groupId).messageUsers.find(gu => gu.user.userName == this.authService.jwtService.getUserNameFromToken()).pendingSend = false;

    this.authService.sLS.secureLS.set("IL",il);
    //TO DO: UPDATE UI RECORD IN ORDER TO SHOW SENDING PROCESS CURRENT STATE
  }
  onConversationSummonedHandler(data: Group) {
    console.log(JSON.stringify(data));
    this.currentGroup = data;
  }
  onConversationCreationHandler(data: Group) {
    data.id = undefined;
    // let il = this.authService.sLS.secureLS.get("IL");
    // (il.groups as Group[]).push(data);
    // this.authService.sLS.secureLS.set("IL", il);
    this.currentGroup = data;
    this.messages = [];
  }
  submitMessage(cm: string): void {
    let msg: Message = {
      content: cm,
      created: "",
      realCreated: new Date(),
      creatorName: this.authService.getUser().userName,
      isMine: true,
      id: Guid.create()
    };
    let il = this.authService.sLS.secureLS.get("IL") as InitialLoad;
    let mu = {realMsg:(msg as Message), user: this.authService.getUser(), pendingSend: true} as MessageUser;
    il.groups.find(g => g.id == this.currentGroup.id).messageUsers.push(mu);
    //
    this.authService.sLS.secureLS.set("IL",il);
    //
    this.items.find(g => g.id == this.currentGroup.id).messageUsers.push(mu);
    this.messages.push(msg);
    //
    //
    (msg as any).id =  msg.id.toString();
    this.currentGroup.id != undefined ? this.chatService.sendMessage(msg, this.currentGroup.id) : this.chatService.sendFirstMessage();
  }
  scrollBottom(){
    document.querySelector(".right-chat-panel").scrollTop = document.querySelector(".right-chat-panel").scrollHeight - document.querySelector(".right-chat-panel").clientHeight;
    console.log(`${document.querySelector(".right-chat-panel").scrollHeight} - ${document.querySelector(".right-chat-panel").clientHeight} = ${document.querySelector(".right-chat-panel").scrollTop} `);
  }


  switchConversation(group: Group) {
    this.currentGroup = group;
    this.messages = [];
    this.messages = [...group.messageUsers.filter((mu) => mu.realMsg.isMine).sort((m: MessageUser, n: MessageUser): number => { return new Date(m.realMsg.realCreated).getTime() - new Date(n.realMsg.realCreated).getTime(); }).map(item => item.realMsg)];
    console.log(JSON.stringify(this.messages));
    // let unread = this.currentGroup.messageUsers.filter(mu => mu.pendingReceive);
    // if(unread.length){
    //   this.chatService.setAlreadyReceivedIn(unread);
    // }
    
  }
  isMine(msg: Message) {
    return msg.creatorName == this.authService.jwtService.getUserNameFromToken();
  }
}








export interface SearchUser {
  username: string
}
export interface SearchUserRequest {
  NameFragment: string,
  SkippingResults: number

}
