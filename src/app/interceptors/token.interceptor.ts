import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { AccessToken } from '../models/keycloak-model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private _authenticationService: AuthenticationService,
    private _http: HttpClient
  ) {}

  private shouldBeIntercepted(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith(environment.api.url);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldBeIntercepted(request)) {
      let headers = request.headers;
      if (this._authenticationService.isAuthenticated()) {
        const token: AccessToken | null =
          this._authenticationService.getToken();
        headers = headers.set(
          'Authorization',
          'Bearer ' + token?.access_token
        );
      }

      request = request.clone({ headers: headers });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this._http.post<AccessToken>('', null).pipe(
      switchMap((token: AccessToken) => {
        this._authenticationService.setToken(token);
        const accessToken = this._authenticationService.getToken();

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken?.access_token}`,
          },
        });

        return next.handle(request);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
