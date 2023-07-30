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
  private static readonly BASE_URL = environment.keycloakConfig.baseUrl;
  private static readonly CLIENT_ID = environment.keycloakConfig.clientId;
  private static REALM = environment.keycloakConfig.realm;
  private static GRANT_TYPE_PASSWORD = environment.keycloakConfig.grantTypes.password;
  private static GRANT_TYPE_REFRESH_TOKEN = environment.keycloakConfig.grantTypes.refreshToken;

  constructor(
    private _apiService: ApiService,
    private _http: HttpClient
  ) {}
  public login(credentials: Credentials): Observable<AccessToken | null> {
    

    const data = {
      grant_type: KeycloakService.GRANT_TYPE_PASSWORD,
      client_id: KeycloakService.CLIENT_ID,
      username: credentials.email,
      password: credentials.password,
    };

    const urlEncodedData = new URLSearchParams(data).toString();
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const url = this.makeUrl('token');
    return this._http
      .post<AccessToken>(url, urlEncodedData, {
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
    const url = this.makeUrl('logout');
    return this._http
      .post(url, {
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

  private makeUrl(path: string): string {
    return `${KeycloakService.BASE_URL}${KeycloakService.REALM}/protocol/openid-connect/${path}`;
  }

 
}
