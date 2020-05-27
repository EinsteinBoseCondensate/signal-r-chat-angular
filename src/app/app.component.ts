import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { AuthService } from './modules/shared-services/auth/authService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'BasicClient';

  authService: AuthService;
  username: string;
  isUserLogged: boolean;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.isUserLogged = undefined;
  }
  async ngOnInit(): Promise<void> {
    //launch-auth-localStorage-tokenServer-check-process
    this.authService.loginSuccess.subscribe(this.loginSuccessHandler());
    this.authService.onLogout.subscribe(this.onLogOutHandler());
  }
  loginSuccessHandler() {
    return (a: string) => {
      this.isUserLogged = true;
      this.username = a;
    }

  }
  onLogOutHandler() {
    return () => {
      this.isUserLogged = false;
      this.username = undefined;
    }
    
  }

}
