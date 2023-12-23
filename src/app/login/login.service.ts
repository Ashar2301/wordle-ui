import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = environment.SERVER_API_URL;
  constructor(private http: HttpClient) {}

  loginUser = (user: any): Observable<HttpResponse<any>> => {
    return this.http.post<any>(`${this.url}/login`, user, {
      observe: 'response',
    });
  };

  logoutUser = (): Observable<HttpResponse<any>> => {
    return this.http.get<any>(`${this.url}/logout`, { observe: 'response' });
  };
  signUpUser = (user: any): Observable<HttpResponse<any>> => {
    return this.http.post<any>(`${this.url}/signup`, user, {
      observe: 'response',
    });
  };
}
