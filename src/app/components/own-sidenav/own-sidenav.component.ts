import { Component, OnInit, Input } from '@angular/core';
import { User } from '../log-in-register/model/user';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-own-sidenav',
  templateUrl: './own-sidenav.component.html',
  styleUrls: ['./own-sidenav.component.scss']
})
export class OwnSidenavComponent implements OnInit {
  
  constructor() {

   }
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
}
