import { Injectable } from '@angular/core';
import { AccessToken } from '../models/keycloak-model';
import { Constants } from '../Constants';
import { flatMap, mergeMap, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static readonly STORAGE_KEY_TOKEN = 'token';
  public token!: AccessToken | null;

  private static readonly STORAGE_KEY_USER = 'user';
  public user: any;

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

  public fromCache() {
    return this.getLocalStorageValue(StorageService.STORAGE_KEY_TOKEN).pipe(
      mergeMap(value => {
        if (value) {
          this.token = JSON.parse(value);
        }
        return this.getLocalStorageValue(StorageService.STORAGE_KEY_USER);
      }),
      map(() => {
        return true;
      })
    );
  }

  public getLocalStorageValue(key: string) {
    const value: string | null = localStorage.getItem(
      Constants.LOCAL_STORAGE_PREFIX + key
    );
    return of(value);
  }
}
