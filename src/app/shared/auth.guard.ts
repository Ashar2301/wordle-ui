import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallsInterceptorInterceptor } from './api-calls-interceptor.interceptor';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private apiCallsInterceptor: ApiCallsInterceptorInterceptor,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {     
      
    if (
      this.apiCallsInterceptor.isTokenInvalidFunction() ||
      localStorage.getItem('userEmail') === ''
    ) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
