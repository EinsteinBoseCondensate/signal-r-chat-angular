import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInRegisterComponent } from './components/log-in-register/log-in-register.component';
import { ChatsComponent } from './components/chats/chats.component';


const routes: Routes = [
  {path:'access', component: LogInRegisterComponent},
  {path:'chats', component: ChatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
