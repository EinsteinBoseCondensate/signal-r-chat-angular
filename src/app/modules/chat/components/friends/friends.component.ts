import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from '../../services/chatService';
import { AuthService } from 'src/app/modules/shared-services/auth/authService';
import { SnackBarService } from 'src/app/modules/shared-services/UI/snack-bar-service';
import { Guid } from 'guid-typescript';
import { SignalRService } from 'src/app/modules/shared-services/signal-r/signalrService';
import { Group, User, Friendship } from 'src/app/models/Backend/user-lazy-loaded';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  floatLabelControl = new FormControl('always');

  options: FormGroup;
  users: any[];
  friends: Friendship[];
  pendingFriends: Friendship[];
  fxFlexForLeftColumn: string = "0 0 0%";
  fxFlexForRightColumn: string = "0 0 100%";
  hideRequiredControl = new FormControl(false);
  constructor(fb: FormBuilder, 
    private chatService: ChatService,    
    private snackBarService: SnackBarService,
     private authService: AuthService,
     private signalrService: SignalRService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  ngOnInit(): void {
    this.chatService.onUsersSearchResult.subscribe((data: any[]) => {
      try {
        if (data.length > 0) {
          this.users = data;
          this.fxFlexForLeftColumn = "0 0 25%";
          this.fxFlexForRightColumn = "0 0 75%";
        }else{
          this.snackBarService.openSnackBar("Search yielded no results", "GO GTA V SON");
        }
      } catch (e) {
        console.log(`Exception at processing fetched users \n ${JSON.stringify(e)}\n${JSON.stringify(data)}`)
      }
    });
    this.friends = this.authService.sLS.secureLS.get("IL").frienships.filter(f => !f.pending) as Friendship[];
   
    this.pendingFriends = this.authService.sLS.secureLS.get("IL").frienships.filter(f => f.pending) as Friendship[];
  }
  async waitAndSearch(arg: string) {
    await this.chatService.waitAndFetchUserNames(arg);
  }
  createOrGetConversation(friend: Friendship){
    console.log(JSON.stringify(friend));
    let conversation: Group = this.authService.sLS.secureLS.get("IL").groups
                          .find((g: Group) => g.groupUsers.length == 2 
                          && g.groupUsers.map((u: User) => u.userName).indexOf(friend.friendName) != -1);//Take it from in memory groups             
    if(conversation != undefined ){
      this.chatService.manageSummonedConversationState(conversation);
    }else{
      //CREATE IN-MEMORY REPRESENTATION OF GROUP/CONVERSATION AND STORE IT IN DB WHEN FIRST MESSAGE IS SENT
      this.chatService.manageNewConversationState({ name: friend.friendName, groupUser: [this.authService.getUser(), { id: friend.id, userName: friend.friendName }] as unknown as User[] } as unknown as Group);
    }
  }
  addFriend(id: Guid){
    this.signalrService.addFriend(id);
  }
}
