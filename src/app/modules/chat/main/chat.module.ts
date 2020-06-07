import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { MaterialSelectedModule } from '../../ext-lib-wrappers/material-selected/material-selected.module';
import { ChatRowComponent } from '../components/chat-row/chat-row.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MainComponent } from './main.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { ChatService } from '../services/chatService';
import { ChatsComponent } from '../components/chats/chats.component';
import { SharedServicesModule } from '../../shared-services/shared-services.module';
import { MessageComponent } from '../components/message/message.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ScrollBottomDirective } from '../directives/scroll-bottom-directive';


@NgModule({
  declarations: [
    MessageComponent,
    ChatRowComponent,
    ChatsComponent,
    MainComponent,    
    ScrollBottomDirective,
    FriendsComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialSelectedModule
  ],
  exports: [
    MessageComponent,
    ChatRowComponent,
    ChatsComponent,
    MainComponent,    
    ScrollBottomDirective,
    FriendsComponent],
  providers:[
    ChatService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ]
})
export class ChatModule {
  static forRoot() : ModuleWithProviders{
    return {
      ngModule: ChatModule, providers:[ChatService]
    }
  }
}
