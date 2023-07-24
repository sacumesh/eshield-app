import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { AccessToken } from '../models/keycloak-model';
import { filter } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private _authenticationService: AuthenticationService) {}

  private shouldBeIntercepted(request: HttpRequest<unknown>): boolean {
    console.log('Sfds');
    return request.url.startsWith(environment.API_URL);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldBeIntercepted(request)) {
      const headers = request.headers;
      if (this._authenticationService.isAuthenticated()) {
        const token: AccessToken | null =
          this._authenticationService.getToken();
        headers.set('Authentication', 'Bearer ' + token?.access_token);
      }

      request = request.clone({ headers: headers });
    }

    return next.handle(request);
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this._authenticationService.getRefreshToken();

      if (token) {
        return this._authenticationService.refreshToken('token').pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this._authenticationService.setToken(token);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError(err => {
            this.isRefreshing = false;
            this._authenticationService.logout();
            return throwError(err);
          })
        );
      } else {
        this._authenticationService.logout();
        return throwError('Refresh token not available.');
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(request, token))),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }
  }

  private addTokenHeader(
    request: HttpRequest<any>,
    token?: string | null
  ): HttpRequest<any> {
    const accessToken = token || this._authenticationService.getToken();

    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return request;
  }
}
