import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { AccessToken } from '../models/keycloak-model';
import { catchError, mergeMap, Observable, of } from 'rxjs';
import { Credentials } from '../models/credentials';
import { environment } from '../../environments/environment';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _http: HttpClient,
    private _apiService: ApiService,
    private _storageService: StorageService,
    private _keycloakService: KeycloakService
  ) {}

  public getToken(): AccessToken | null {
    return this._storageService.token;
  }

  public setToken(token: AccessToken): Observable<boolean> {
    return this._storageService.storeToken(token);
  }

  public isAuthenticated(): boolean {
    return this._storageService.token != null;
  }

  public getRefreshToken(): string | null {
    return this._storageService.token?.refresh_token || null;
  }

  public login(credentials: Credentials): Observable<boolean> {
    return this._keycloakService.login(credentials).pipe(
      mergeMap((token: AccessToken | null) => {
        return this._storageService.storeToken(token);
      }),
      catchError(errorResponse => {
        this._apiService.handleErrorResponse(errorResponse);
        return of(false);
      })
    );
  }

  public logout(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return of(true);
    return this._keycloakService.logout(token);
  }
}
