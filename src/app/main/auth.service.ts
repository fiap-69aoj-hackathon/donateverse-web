import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, pipe, of, throwError, } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { GatewayService } from 'app/shared/gateway.service';
import { Login } from './login/login.model';
import { Token } from './login/token.model';

@Injectable()
export class AuthService {
  token: Token;

  constructor(private router: Router, private gatewayService: GatewayService) { }

  login(login: Login): Observable<any> {
    return this.gatewayService.login(login)
      .pipe(
        map(tokenResponse => {
          this.token = tokenResponse;
          return true;
        }),
        catchError(error => {
          this.token = null;
          return of(false);
        })
      );
  }

  logout() {
    this.token = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.token != null;
  }

  getToken() {
    return this.token.token;
  }
}
