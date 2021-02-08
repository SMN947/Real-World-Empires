import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  get(data = {}) {
    const path = environment.API + '/api/sqlget';
    return this.http.post(path, data);
  }

  update(data, request) {
    const path = environment.API + '/api/sql' + request;
    return this.http.post(path, data);
  }

  refreshSession(refreshToken) {
    const path = environment.API + '/api/refreshToken';
    return this.http.post(path, { refreshToken });
  }

}
