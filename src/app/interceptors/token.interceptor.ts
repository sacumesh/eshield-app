import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  private shouldBeIntercepted(request: HttpRequest<unknown>): boolean {
    console.log('Sfds');
    return request.url.startsWith(environment.API_URL);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(this.shouldBeIntercepted(request));
    return next.handle(request);
  }
}
