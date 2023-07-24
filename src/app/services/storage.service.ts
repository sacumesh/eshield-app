import { Injectable } from '@angular/core';
import { AccessToken } from '../models/keycloak-model';
import { Constants } from '../Constants';
import { mergeMap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static readonly STORAGE_KEY_TOKEN = 'token';
  public token!: AccessToken | null;

  private static readonly STORAGE_KEY_USER = 'user';
  public user: any;

  private static readonly STORAGE_KEY_REFRESH_TOKE = 'refresh-token';
  public refreshToken!: AccessToken | null;

  constructor() {}

  public storeToken(token: AccessToken | null): Observable<boolean> {
    this.token = token;
    localStorage.setItem(
      Constants.LOCAL_STORAGE_PREFIX + StorageService.STORAGE_KEY_TOKEN,
      JSON.stringify(token)
    );

    return of(true);
  }

  public storeUser(user: any): Observable<boolean> {
    this.user = user;
    localStorage.setItem(
      Constants.LOCAL_STORAGE_PREFIX + StorageService.STORAGE_KEY_USER,
      JSON.stringify(user)
    );

    return of(true);
  }

  public clear(): Observable<boolean> {
    return this.storeUser(null).pipe(mergeMap(() => this.storeToken(null)));
  }
}
