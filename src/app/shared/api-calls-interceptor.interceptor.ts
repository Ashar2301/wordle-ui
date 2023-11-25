import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class ApiCallsInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  isTokenInvalid: boolean = false;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.beforeRequest(request);
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (event.status === 403) {
              this.isTokenInvalid = true;
              localStorage.setItem('userEmail', '');
              this.router.navigate(['/']);
            } else {
              this.setNewToken(event);
              this.isTokenInvalid = false;
            }
          }
        },
        (error) => {
          console.error(error);
          if (error.status === 403) {
            this.isTokenInvalid = true;
            localStorage.setItem('userEmail', '');
            this.router.navigate(['/']);
          }
        }
      )
    );
  }

  isTokenInvalidFunction = () => {
    return this.isTokenInvalid;
  };

  beforeRequest = (request: HttpRequest<any>) => {
    const accessToken = localStorage.getItem('accessToken');
    const header = new HttpHeaders({ authorization: `Bearer ${accessToken}` });
    let modifiedRequest = request.clone({ headers: header });

    return modifiedRequest;
  };

  setNewToken = (event: HttpResponse<any>) => {
    event.headers.keys().forEach((keyName) => {
      if (keyName === 'authorization') {
        localStorage.setItem('accessToken', event.headers.get(keyName)!);
      }
    });
  };
}
