import { EventEmitter, Injectable, OnInit } from '@angular/core';  
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ChatMessage } from 'src/Models/chatmessage.model';
@Injectable({
  providedIn: 'root'
})
export class SignalRMService implements OnInit {

  messageReceived = new EventEmitter<any>();  
  connectionEstablished = new EventEmitter<Boolean>(); 
  dataReceived = new EventEmitter<any>(); 
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {  
    console.log("initiating service");
  }
  ngOnInit(){
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }
  
  sendChatMessage(message: ChatMessage) {  
    this._hubConnection.invoke('SendMessage', message);  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl("http://localhost:5000/home?ownName="+localStorage.getItem("userName"))  
      .build();  
  }  
  
  private startConnection(): any {  
    setTimeout(()=>{
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
    this._hubConnection.on('ReceiveMathTwoGraphData', (data: any) =>{
      this.dataReceived.emit(data);
    });
  }  
  public sendChatMessageToGroup(guid:string) : void{
      this._hubConnection.invoke('SendChatMessage', guid);
  }
}
