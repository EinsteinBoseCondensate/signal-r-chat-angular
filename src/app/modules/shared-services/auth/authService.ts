import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { HttpRequest, HttpEvent, HttpEventType, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EndPoints } from '../../../models/Backend/requestConstants';
import { tokenResult } from '../../../components/log-in-register/model/tokenResult';
import { JwtService } from './jwt-service';
import { Router } from '@angular/router';
import { SnackBarService } from '../UI/snack-bar-service';
import { InitialLoad, User } from 'src/app/models/Backend/user-lazy-loaded';
import { SecureLsService } from '../helpers/secure-ls';
import { UserLogin } from 'src/app/components/log-in-register/model/user';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    @Output() loginSuccess;
    @Output() onLogout;
    @Output() registerSuccess;
    jwtService: JwtService;
    httpClient: HttpClient;
    initialLoad: InitialLoad;
    currentUser: User;
    private isUserLogged: boolean;
    
  
    isLogin: boolean;
    constructor(httpClient: HttpClient, jwtService: JwtService,
        private router: Router,
        private snackBarService: SnackBarService,
        public sLS: SecureLsService) {
        this.httpClient = httpClient;
        this.jwtService = jwtService;
        this.loginSuccess = new EventEmitter<string>();
        this.registerSuccess = new EventEmitter<boolean>();
        this.onLogout = new EventEmitter<boolean>();
        this.isUserLogged = undefined;
    }
    async isAuth(): Promise<boolean> {
        if (this.isUserLogged != undefined) {
            return this.isUserLogged;
        } else {
            await this.testToken();
        }
    }
    getUser(): User{
        return {id : this.jwtService.getIdFromToken(), userName: this.jwtService.getUserNameFromToken()} as User;
    }
    tryLoginRegister(user: UserLogin, isLogin: boolean) {
        this.isLogin = isLogin;
        this.httpClient.post<any>((isLogin ? EndPoints.Login : EndPoints.Register), user).subscribe((r: any) => {
            try {
                if (this.isLogin) {
                    this.handleLogInRequest(r);
                } else {
                    this.handleRegisterRequest(r);
                }
            } catch (e) {
                this.router.navigate(["/access"]);
            }
        },(e: any) => {
            this.snackBarService.openSnackBar("Auth fail", "we're sorry, try later");
        }
        ,() => {});
    }

    handleLogInRequest(res: tokenResult) {
        try {
            if (res.result.token != "" && res.result.token != "exception") {
                this.sLS.secureLS.set("Bearer", res.result.token);
                try{
                    this.sLS.secureLS.set("IL", res.result.initialLoad);
                    this.currentUser = {id: this.jwtService.getIdFromToken(), userName: this.jwtService.getUserNameFromToken()};
                }catch(e){
                    console.log(JSON.stringify(e));
                }
                this.loginSuccess.emit(this.jwtService.getUserNameFromToken());
                this.isUserLogged = true;
                this.snackBarService.openSnackBar("Auth success", "login");
                this.router.navigate(["/chats"]);
            }
        } catch (e) {
            console.log(`Exception at success response handler: \n\n${e}`)
        }

    }
    handleRegisterRequest(res: tokenResult) {
        try {
            this.snackBarService.openSnackBar("Register success", "go login");
        } catch (e) {
            console.log(`Exception at success response handler: \n\n${e}`)
        }

    }
    async testToken(): Promise<boolean> {
        this.snackBarService.openSnackBar("Server fetched page", "Checking Auth");
        if (localStorage.Bearer == undefined) {
            this.snackBarService.openSnackBar("Need to login", "login");
            this.router.navigate(["/access"]);
        }
        let p = await this.initialCheck();
        if (p != undefined && p) {
            this.snackBarService.openSnackBar("Auth success", "login");
            this.loginSuccess.emit(this.jwtService.getUserNameFromToken());
            this.currentUser = {id: this.jwtService.getIdFromToken(), userName: this.jwtService.getUserNameFromToken()};
            this.router.navigate(["/chats"]);
            return true;
        //coming soon... password check
        } else if (p != undefined) {
            this.snackBarService.openSnackBar("Need to login", "login");
            this.router.navigate(["/access"]);
        } else {
            this.snackBarService.openSnackBar("Network error, go GTA V son", "login");
            this.router.navigate(["/access"]); 
        }
        return false;
    }

    async initialCheck(): Promise<boolean> {
        return new Promise((res, rej) => {
            this.httpClient.post<any>(EndPoints.TestToken, {}, {
                headers: {
                    'Authorization': `Bearer ${this.sLS.secureLS.get("Bearer")}`
                }
            }).subscribe((r: any) => {
                if (r.result != undefined) {
                    this.isUserLogged = r.result == "ok";
                }
            }, (e: any) => {
                this.isUserLogged = undefined;
                    if (e.status == 401) {
                        this.isUserLogged = false;                        
                    } 
                    res(this.isUserLogged);
            }, () => { res(this.isUserLogged); }
            );
        });
    }

    checkHttpEventResponse<T>(event: HttpEvent<HttpRequest<T>>): boolean {

        try {
            return event.type === HttpEventType.Response && (event as unknown as HttpErrorResponse).ok;
        } catch{
            return false;
        }
    }

    logOut(){
        this.onLogout.emit();
        localStorage.clear();
    }
}