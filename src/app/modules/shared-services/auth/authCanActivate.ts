import { CanActivate } from '@angular/router';import { AuthService } from './authService';import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthCanActivate implements CanActivate {

    constructor(
      private auth: AuthService
    ) {
    }
  
    public canActivate(
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.isAuth();
    }
  }

  @Injectable({
    providedIn: 'root',
})
export class AlreadyAuthCanActivate implements CanActivate {

    constructor(
      private auth: AuthService
    ) {
    }
  
    public canActivate(
    ): Observable<boolean> | Promise<boolean> | boolean {
      return !this.auth.isAuth();
    }
  }