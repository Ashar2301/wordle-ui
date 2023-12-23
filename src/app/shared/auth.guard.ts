import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    if(this.authService.returnUser()){
      return true;
    }
    return this.authService.isAuthenticated().pipe(
      map((response: any) => {
        if (response.status !== 200) {
          this.router.navigate(['/login']);
          return false;
        }
        this.authService.setUser(response.body);
        return true;
      })
    );
  }
}
