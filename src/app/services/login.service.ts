import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface UserInfo {
  idccms: number;
  nombre: string;
  refreshToken: string;
  token: string;
  username: string;
  ne: object;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: any;
  private path = environment.API;
  private apiKey = environment.Key;
  private apiToken = null;
  private requestedToken = false;

  constructor(private http: HttpClient) {
    this.apiKey = environment.Key
  }
  
  body(fName, fParam) {
    var body = new FormData();
    body.append("apiKey", this.apiKey)
    body.append("apiToken", this.apiToken)
    body.append("apiFunctionParams", fParam)
    body.append("apiFunctionName", fName)
    console.log(body);
    return body;
  }

  getToken() {
    console.log('Getting tkn');
    this.requestedToken = true;
    this.http.post(this.path, this.body('getToken', `{"api_key":"${this.apiKey}"}`)).subscribe((res: any) => {
      if (res.success) {
        this.apiToken = res.dataArray.token;
      } else {
        this.checkToken();
      }
    }, err => {
      //
    });
  }
  
  login(user, pass) {
    return this.http.post(this.path, this.body('getUserLogin', `{user: ${user}, pass: ${pass}}`));
  }

  setUser(info) {
    localStorage.setItem('info', JSON.stringify(info));
  }

  getUser(): UserInfo {
    return JSON.parse(localStorage.getItem('info'));
  }

  logout() {
    localStorage.clear();
  }

  checkToken() {
    if (this.requestedToken) {
      console.log("test2");
      if (this.apiToken === null) {
        console.log("Cant auth this app");
      }
    } else {
      if (this.apiToken === null) {
        console.log("test");
        this.getToken();
      }
    }
  }

  relogin(user) {
    localStorage.removeItem('info');
    localStorage.setItem('info', JSON.stringify(user));
    return true;
  }
}
