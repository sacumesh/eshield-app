import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  public getToken() {
    return null;
  }

  public setToken() {
    return null;
  }

  public isAuthenticated() {
    return false;
  }

  public login() {}

  public logout() {}
}
