import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private loginService: LoginService, private http: HttpClient) {}

  private user: any = null;
  private url = environment.SERVER_API_URL;
  public login(token: string): void {}

  public logout(): void {
    this.user = null;
    this.loginService.logoutUser().subscribe({
      error: (e) => {
        console.error(e);
      }
    });
  }

  public setUser = (user: any) => {
    this.user = user;
  };

  public returnUser = () => {
    return this.user;
  };

  public isAuthenticated = (): Observable<HttpResponse<any>> => {
    return this.http.get<any>(`${this.url}/account`, { observe: 'response' });
  };
}
