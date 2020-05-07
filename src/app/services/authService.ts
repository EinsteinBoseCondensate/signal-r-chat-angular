import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { HttpRequest, HttpEvent, HttpEventType, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { EndPoints } from '../models/Backend/requestConstants';
import { User } from '../components/log-in-register/model/user';
import { tokenResult } from '../components/log-in-register/model/tokenResult';
import { JwtService } from './jwt-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    @Output() loginSuccess;
    @Output() registerSuccess;
    jwtService: JwtService;
    httpClient: HttpClient;
    constructor(httpClient: HttpClient, jwtService: JwtService) {
        this.httpClient = httpClient;
        this.jwtService = jwtService;
        this.loginSuccess = new EventEmitter<string>();
        this.registerSuccess = new EventEmitter<boolean>();
    }
    tryLoginRegister(user: User, isLogin: boolean) {
        const req = new HttpRequest('POST', isLogin ? EndPoints.Login : EndPoints.Register, user);
        console.log(JSON.stringify(req));
        this.httpClient.request<HttpRequest<tokenResult>>(req).subscribe((event: HttpEvent<HttpRequest<tokenResult>>) => {
            try {
                if (this.checkHttpEventResponse(event)) {
                    this.handleLogInRegisterRequest((event as unknown as HttpRequest<tokenResult>).body, isLogin);
                }
            }
            catch (e) {
                console.log(`Exception at login event response: \n\n${JSON.stringify(e)}\n\n${JSON.stringify(event)}`)
            }
        });
    }
    checkHttpEventResponse(event: HttpEvent<HttpRequest<tokenResult>>):boolean{
        
        try{
            return event.type === HttpEventType.Response;
        }catch{
            return false;
        }
    }
    handleLogInRegisterRequest(res: tokenResult, isLogin: boolean) {
        if (isLogin) {
            if (res.result.token != "" && res.result.token != "exception") {
                localStorage.setItem("Bearer", res.result.token);
                console.log(this.jwtService.getDecodedAccessToken(res.result.token));
                this.loginSuccess.emit(res.result.username);
            } else {
                //to do
            }
        }
    }
}