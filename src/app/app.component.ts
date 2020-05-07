import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { AuthService } from './services/authService';

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
  }
  ngOnInit(): void {
    //launch-auth-localStorage-tokenServer-check-process
    this.authService.loginSuccess.subscribe(this.loginSuccess());
  }
  loginSuccess() {
    return (a: string) => {
      console.log(a);
      this.isUserLogged = true;
      this.username = a;
    }
  }

}
