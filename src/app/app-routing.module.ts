import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { LogInRegisterComponent } from './components/log-in-register/log-in-register.component';
import { AuthCanActivate, AlreadyAuthCanActivate } from './modules/shared-services/auth/authCanActivate';



const routes: Routes = [
  {path:'', component: LogInRegisterComponent},
  {path:'access', component: LogInRegisterComponent},
  {path:'chats',  loadChildren: () => import(`./modules/chat/main/chat.module`).then(m => m.ChatModule) , canActivate:[AuthCanActivate]},
  { path: '*', component: LogInRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
