import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/authService';
import { JwtService } from './auth/jwt-service';
import { Fetcher } from './helpers/webClient';
import { SignalRService } from './signal-r/signalrService';
import { SnackBarService } from './UI/snack-bar-service';
import { ArrayHelper } from './helpers/array-helper';
import { AuthCanActivate } from './auth/authCanActivate';
import * as SecureLS from 'secure-ls/dist/secure-ls';
import { SecureLsService } from './helpers/secure-ls';


@NgModule({
  declarations: [
    
],
  imports: [
    CommonModule,
  ],
})
export class SharedServicesModule {
static forRoot() : ModuleWithProviders{
  return {
    ngModule: SharedServicesModule, providers:[
      //Auth
      AuthService,
      JwtService,
      AuthCanActivate,
      //WebClient
      Fetcher,
      //SignalR
      SignalRService,
      //UI
      SnackBarService,
      //GeneralHelpers
      ArrayHelper,
      SecureLsService
    ]
  };
}

 }
