import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from '../main/login/login.model';
import { User } from '../model/user.model';
import { Token } from 'app/main/login/token.model';

@Injectable()
export class GatewayService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:9091';
    // this.url = 'http://donateverse-api.sa-east-1.elasticbeanstalk.com'
  }

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, login);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user/users`, user);
  }

  getUser(token: string) {
    return this.http.get<User>(`${this.url}/user/users/me`, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }

}
