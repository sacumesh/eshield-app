import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AccessToken } from '../models/keycloak-model';
import { catchError, mergeMap, Observable, of } from 'rxjs';
import { Credentials } from '../models/credentials';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _http: HttpClient,
    private _apiService: ApiService,
    private _storageService: StorageService
  ) {}

  public getToken(): AccessToken | null {
    return this._storageService.token;
  }

  public setToken(token: AccessToken): Observable<boolean> {
    return this._storageService.storeToken(token);
  }

  public isAuthenticated() {
    return this._storageService.token != null;
  }

  public getRefreshToken() {
    return this._storageService.refreshToken;
  }

  public refreshToken(token: string) {
    return this._http.post(environment.AUTH_ENDPOINT + 'refreshtoken', {
      refreshToken: token,
    });
  }

  public login(credentials: Credentials): Observable<boolean> {
    return this._http
      .post<AccessToken>(environment.AUTH_ENDPOINT, credentials, {})
      .pipe(
        mergeMap((token: AccessToken) => {
          if (token) {
            return this._storageService.storeToken(token);
          } else {
            return this._storageService.storeToken(null);
          }
        }),
        catchError(errorResponse => {
          this._apiService.handleErrorResponse(errorResponse);
          // Return a new observable to continue the error flow or recover from the error
          return of(false); // Replace `false` with an appropriate value based on your use case
        })
      );
  }

  public logout() {}
}
