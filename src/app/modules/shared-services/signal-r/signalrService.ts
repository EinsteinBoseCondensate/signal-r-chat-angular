import { EventEmitter, Injectable, OnInit } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Guid } from 'guid-typescript';
import { SecureLsService } from '../helpers/secure-ls';
import { EndPoints } from 'src/app/models/Backend/requestConstants';
import { JwtService } from '../auth/jwt-service';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  messageReceived = new EventEmitter<any>();  
  connectionEstablished = new EventEmitter<Boolean>(); 
  dataReceived = new EventEmitter<any>(); 
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor(
    private sLS :SecureLsService,
    private jwtS: JwtService
  ) {  
    console.log("initiating service");
    console.log('initiating signalrservice');
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
      console.log(`Connection created with url: ${EndPoints.SignalR}?own=${this.jwtS.getIdFromToken()}`);
  }  
  
  private startConnection(): any {  
    setTimeout(()=>{
      console.log('just about trying stablishing connection');
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;   
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        this.connectionEstablished.emit(false);
      }).finally(() => {return "";});
    }  
      , 5000); 
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('ReceiveMessage', (data: any) => {  
      console.log("messageReceived" + JSON.stringify(data));
      this.messageReceived.emit(data);  
    });  
    this._hubConnection.on('AddedFriendOk', ( data: any ) => {

    });
    this._hubConnection.on('AddedFriendKo', ( data: any ) => {
      
    });
  }  
  public sendChatMessageToGroup(msg:string, guid: Guid) : void{
      this._hubConnection.invoke('SendChatMessage', `${guid}#$$#${msg}`).catch(err => this.manageDisconnectedState(err));
  }
  manageDisconnectedState(err: Error): any {
    alert("TO DO : RETRY CONNECTION + BLOCK UI\n\n"+JSON.stringify(err));
  }
  addFriend(id: Guid){
    this._hubConnection.invoke('AddFriend', {RequesterId : this.jwtS.getIdFromToken(), RequestedId: id});
  }
}
