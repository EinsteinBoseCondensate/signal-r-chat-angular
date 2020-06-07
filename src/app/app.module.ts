import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInRegisterComponent } from './components/log-in-register/log-in-register.component';
import { OwnSidenavComponent } from './components/own-sidenav/own-sidenav.component';
import { HttpClientModule } from '@angular/common/http';

import { ChatModule } from './modules/chat/main/chat.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { SharedServicesModule } from 'src/app/modules/shared-services/shared-services.module';
import { MaterialSelectedModule } from './modules/ext-lib-wrappers/material-selected/material-selected.module';
import { OutOfConnectionComponent } from './components/out-of-connection/out-of-connection.component';
import { MessageComponent } from './modules/chat/components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInRegisterComponent,
    OwnSidenavComponent,
    OutOfConnectionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChatModule.forRoot(),
    MaterialSelectedModule,
    SharedServicesModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ]
})
export class AppModule {
  constructor(){

  }
 }
