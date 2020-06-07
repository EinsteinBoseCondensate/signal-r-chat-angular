import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsComponent } from '../components/chats/chats.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { MainComponent } from './main.component';


const routes: Routes = [
  {path:'', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }