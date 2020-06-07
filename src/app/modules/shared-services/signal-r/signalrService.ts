import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Guid } from 'guid-typescript';
import { SecureLsService } from '../helpers/secure-ls';
import { EndPoints } from 'src/app/models/Backend/requestConstants';
import { JwtService } from '../auth/jwt-service';
import { FirstMessageModel, MessageSubmitModel } from 'src/app/models/Backend/first-message-model';
import { InitialLoad, Message } from 'src/app/models/Backend/user-lazy-loaded';
import { GuidTuple } from 'src/app/models/Backend/ack-messages';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  messageReceived = new EventEmitter<any>();
  connectionEstablished = new EventEmitter<Boolean>();
  dataReceived = new EventEmitter<any>();
  messageSavedSentOk = new EventEmitter<any>();
  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(
    private sLS: SecureLsService,
    private jwtS: JwtService
  ) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }


  sendChatMessage(message: string) {
    this._hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(encodeURI(`${EndPoints.SignalR}?own=${this.jwtS.getIdFromToken()}`))
      .build();
  }

  private startConnection(): any {
    setTimeout(() => {
      this._hubConnection
        .start()
        .then(() => {
          this.connectionIsEstablished = true;
          this.connectionEstablished.emit(true);
          console.log('connection with chat server stablished');
        })
        .catch(err => {
          this.connectionEstablished.emit(false);
        }).finally(() => { return ""; });
    }
      , 5000);
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
      //this.sendAlreadyReceived(data.id);
    });
    this._hubConnection.on('AddedFriendOk', (data: any) => {

    });
    this._hubConnection.on('MessageSavedSentOk', (data: GuidTuple) => {
      this.messageSavedSentOk.emit(data);
    });
    this._hubConnection.on('AddedFriendKo', (data: any) => {

    });
    this._hubConnection.onclose(e => this.manageDisconnectedState(e));
  }
  public sendChatMessageToGroup(msg: Message, guid: Guid): void {
    let raw = (this.sLS.secureLS.get("IL") as InitialLoad).groups.filter(g => g.id == guid)[0].groupUsers.filter(gu => gu.userName == this.jwtS.getUserNameFromToken());
    this._hubConnection.send('SendMessage',
      {
        GroupId: guid,
        CreatorGroupUserId: raw[0].id,
        MessageUI: {
          content: msg.content,
          created: msg.created,
          creatorName: msg.creatorName,
          isMine: msg.isMine,
          id: msg.id
        }
      });
  } 
  manageDisconnectedState(err: Error): any {
    alert("TO DO : RETRY CONNECTION + BLOCK UI\n\n" + JSON.stringify(err));
  }
  addFriend(id: Guid) {
    this._hubConnection.invoke('AddFriend', { RequesterId: this.jwtS.getIdFromToken(), RequestedId: id });
  }
  sendFirstGroupMessage(model: FirstMessageModel) {
    this._hubConnection.send('SendFirstMessage', model);
  }
  sendAlreadyReceived(guids: Guid) {
    this._hubConnection.send('SetAlreadyReceived', {a: guids, b: this.jwtS.getIdFromToken()});
  }
}

