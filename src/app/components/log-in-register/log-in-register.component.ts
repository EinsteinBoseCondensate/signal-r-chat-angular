import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from './model/user';
import { AuthService } from 'src/app/modules/shared-services/auth/authService';


@Component({
  selector: 'app-log-in-register',
  templateUrl: './log-in-register.component.html',
  styleUrls: ['./log-in-register.component.scss']
})
export class LogInRegisterComponent implements OnInit {
  authService: AuthService;
  options: FormGroup;
  hideRequiredControl = new FormControl(false); 
  floatLabelControl = new FormControl('always');

  isLogin: boolean;
  constructor(fb: FormBuilder, authService: AuthService) {
    this.authService = authService;
    this.isLogin = true;
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  ngOnInit(){
    
  }
  toggleWindow() {
    this.isLogin = !this.isLogin;
  }
  submitData() {
      this.authService.tryLoginRegister(this.user(), this.isLogin);
  }
  user(): User {
    return {
      UserName: (document.querySelector('#username') as HTMLInputElement).value,
      Password: (document.querySelector('#password') as HTMLInputElement).value,
      Email: this.isLogin ? "" : (document.querySelector('#email') as HTMLInputElement).value
    } as User
  }


}
 