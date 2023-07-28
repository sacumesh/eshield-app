import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessToken } from '../models/keycloak-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, mergeMap, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Credentials } from '../models/credentials';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private static readonly BASE_URL = environment.keycloakConfig.url;
  private static readonly CLIENT_ID = environment.keycloakConfig.clientId;
  private static REALM = environment.keycloakConfig.realm;

  constructor(
    private _apiService: ApiService,
    private _http: HttpClient
  ) {}
  public login(credentials: Credentials): Observable<AccessToken | null> {
    const data = {
      grant_type: 'password',
      client_id: KeycloakService.CLIENT_ID,
      username: credentials.email,
      password: credentials.password,
    };

    const urlEncodedData = new URLSearchParams(data).toString();
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http
      .post<AccessToken>(environment.AUTH_ENDPOINT, urlEncodedData, {
        headers,
      })
      .pipe(
        catchError(errorResponse => {
          this._apiService.handleErrorResponse(errorResponse);
          return of(null);
        })
      );
  }

  public logout(token: AccessToken): Observable<boolean> {
    return this._http
      .get(``, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token.access_token}`,
        }),
      })
      .pipe(
        map(() => true),
        catchError(err => {
          this._apiService.handleErrorResponse(err);
          return of(false);
        })
      );
  }
}
