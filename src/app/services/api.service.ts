import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, of, mergeMap, mapTo } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  get<T>(path: string): Observable<T | null> {
    const url = this.makeUrl(path);
    return this._http.get<T>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 404) {
          this.handleErrorResponse(error);
        }
        return of(null);
      })
    );
  }

  postBoolean(path: string, req: object): Observable<boolean> {
    const url = this.makeUrl(path);
    const opts = { headers: this.makeHeaders() };
    return this._http.post(url, req, opts).pipe(
      map(() => true),
      catchError((errorResponse: HttpErrorResponse) => {
        this.handleErrorResponse(errorResponse);
        return of(false);
      })
    );
  }

  put<T>(path: string, req: object): Observable<boolean> {
    const url = this.makeUrl(path);
    const opts = { headers: this.makeHeaders() };
    return this._http.put<T>(url, req, opts).pipe(
      map(() => true),
      catchError((errorResponse: HttpErrorResponse) => {
        this.handleErrorResponse(errorResponse);
        return of(false);
      })
    );
  }

  delete(path: string): Observable<boolean> {
    const url = this.makeUrl(path);
    return this._http.delete(url).pipe(
      map(() => true),
      catchError((errorResponse: HttpErrorResponse) => {
        this.handleErrorResponse(errorResponse);
        return of(false);
      })
    );
  }

  post<T>(
    path: string,
    req: object,
    mapResponse?: (response: any) => Observable<T>
  ): Observable<T | null> {
    const url = this.makeUrl(path);
    const opts = { headers: this.makeHeaders() };
    return this._http.post<T>(url, req, opts).pipe(
      mergeMap(res => (mapResponse ? mapResponse(res) : of(res))),
      catchError((errorResponse: HttpErrorResponse) => {
        this.handleErrorResponse(errorResponse);
        return of(null);
      })
    );
  }

  private makeUrl(path: string): string {
    return environment.API_URL.concat(path);
  }

  private handleErrorResponse(error: HttpErrorResponse): void {
    console.error('An error occurred:', error);
  }

  private makeHeaders(): HttpHeaders {
    return new HttpHeaders();
  }
}
