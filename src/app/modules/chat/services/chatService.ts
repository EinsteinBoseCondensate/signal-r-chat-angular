import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { EndPoints, jsonAuthHeadersObj } from '../../../models/Backend/requestConstants';
import { SignalRService } from '../../shared-services/signal-r/signalrService';
import { chatmsg } from '../components/chats/model/chatMsgModel';
import { delay } from '../../shared-services/helpers/timer';
import { SearchUser, SearchUserRequest } from '../components/chats/model/searchUserModel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared-services/auth/authService';
import { Group, InitialLoad, User } from 'src/app/models/Backend/user-lazy-loaded';
import { SecureLsService } from '../../shared-services/helpers/secure-ls';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { FirstMessageModel } from 'src/app/models/Backend/first-message-model';
import { GuidTuple } from 'src/app/models/Backend/ack-messages';


@Injectable({
    providedIn: 'root',
})
export class ChatService {
    @Output() onSignalRhubConnection;
    @Output() onSignalRhubDisconnection;
    @Output() onUsersSearchResult;
    @Output() onUsersFetchAvailable;
    @Output() onConversationCreation;
    @Output() onConversationSummoned;
    @Output() onMessageSubmittedOk;
    @Output() onMessageReceived;
    private isWaitingToFetchUsers: boolean;
    private isNavigationFromFriendsList: boolean;
    private navigatingToGroup: Group;
    isUserLogged: boolean;
    constructor(private signalRService: SignalRService,
                private httpClient: HttpClient,
                private sLS: SecureLsService,
                private authService: AuthService,
                private router: Router) {
        this.onSignalRhubConnection = new EventEmitter<boolean>();
        this.onSignalRhubDisconnection = new EventEmitter();
        this.onUsersSearchResult = new EventEmitter<SearchUser[]>();
        this.onUsersFetchAvailable = new EventEmitter();
        this.onMessageReceived = new EventEmitter();
        this.onConversationCreation = new EventEmitter<Group>();
        this.onConversationSummoned = new EventEmitter<Group>();
        this.onMessageSubmittedOk = new EventEmitter<GuidTuple>();
        this.isWaitingToFetchUsers = false;
        this.signalRService.connectionEstablished.subscribe((arg: boolean) => this.onSignalRhubConnection.emit(arg));
        this.signalRService.messageSavedSentOk.subscribe((p: GuidTuple) => this.onMessageSubmittedOk.emit(p));
        this.signalRService.messageReceived.subscribe(mr => this.onMessageReceived.emit(mr));
    }

    sendMessage(msg: any, id:Guid) {
        this.signalRService.sendChatMessageToGroup(msg, id)
    }
    setAlreadyReceivedIn(group: Group){
        //this.signalRService.
    }
    sendFirstMessage(){
        this.signalRService.sendFirstGroupMessage({} as FirstMessageModel);
    }
    async waitAndFetchUserNames(arg: string, bypassDelay: boolean = false) {
        if (this.isWaitingToFetchUsers || arg == "") {
            return;
        }
        this.isWaitingToFetchUsers = true;
        let obj = { OwnIds: [...this.sLS.secureLS.get("IL").frienships.map(f => f.id),this.authService.jwtService.getIdFromToken()],NameFragment: '', SkippingResults: 0 };
        obj.NameFragment = arg;
        obj.SkippingResults = 0;
        if (!bypassDelay) {
            await delay(1500);
        }
        this.fetch(obj)
        .then((data :any) => {
            this.onUsersSearchResult.emit(data.result);
        }).catch((e) => {
            console.log(`Network or syntax error...\n${JSON.stringify(e)}`);
        }).finally(() =>{
        this.isWaitingToFetchUsers = false;
        });
    }
    fetch(obj: any) {
        return new Promise((res, rej) => {
            this.httpClient.post<any>(EndPoints.FetchUsers, obj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Response-Type': 'application/json',
                    'Authorization': `Bearer ${this.sLS.secureLS.get("Bearer")}`
                  }
            }).subscribe((r: any) => {res(r);
            }, (e: any) => {
                rej(e);                
            }, () => { res(true); }
            );
        });
    }

    manageSummonedConversationState(conversation: Group){
        this.isNavigationFromFriendsList = true;
        this.navigatingToGroup = conversation;
        this.router.navigate(['/chats']);
    }
    manageNewConversationState(group: Group){
        this.router.navigate(['/chats']);
        this.onConversationCreation.emit(group);
    }
    getCurrentGroupUserByGroupId(groupId: Guid): User{
        return (this.sLS.secureLS.get("IL") as InitialLoad).groups.find(g => g.id == groupId).groupUsers.find(gu => gu.userName == this.authService.jwtService.getUserNameFromToken());
    }
    isNavigation(){
        return this.isNavigationFromFriendsList;
    }
    getNavigatingToGroup(){
        return this.navigatingToGroup;
    }
    resetNavigationFlags(){
        this.isNavigationFromFriendsList = false;
        this.navigatingToGroup = undefined;
    }
}