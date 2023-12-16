import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class ApiCallsInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
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
              this.authService.logout();
              this.router.navigate(['/']);
            }
          }
        },
        (error) => {
          console.error(error);
          if (error.status === 403) {
            this.authService.logout();
            this.router.navigate(['/']);
          }
        }
      )
    );
  }

  beforeRequest = (request: HttpRequest<any>) => {
    let modifiedRequest = request.clone({ withCredentials: true });
    return modifiedRequest;
  };
}
