import { Component, OnInit, Input } from '@angular/core';
import { User } from '../log-in-register/model/user';
import { AuthService } from 'src/app/modules/shared-services/auth/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-own-sidenav',
  templateUrl: './own-sidenav.component.html',
  styleUrls: ['./own-sidenav.component.scss']
})
export class OwnSidenavComponent implements OnInit {
  
  constructor(private authServ: AuthService, 
              private router: Router) {  }
  @Input() username: string;
  @Input() isUserLogged: boolean;
  ngOnInit() {
    
  }
  toggleArrow(){
    let value = document.querySelector(".toggler").innerHTML;
    if(value.indexOf("gt;") !== -1){
      console.log("greater");
      document.querySelector(".toggler").innerHTML = value.replace("gt;", "lt;");
    }else{
      document.querySelector(".toggler").innerHTML = value.replace("lt;", "gt;");
    }
  }
  logOut(){
    this.authServ.logOut();
    this.router.navigate(["/access"]);
  }
}
