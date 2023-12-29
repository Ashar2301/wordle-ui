import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private url = environment.SERVER_API_URL;
  constructor(private http: HttpClient) {}

  validateURL = (token: string): Observable<HttpResponse<any>> => {
    const params = new HttpParams().set('url', token);
    return this.http.get<any>(`${this.url}/validateURL`, {
      params,
      observe: 'response',
    });
  };
  resetPassword = (
    email: string,
    password: string
  ): Observable<HttpResponse<any>> => {
    return this.http.post<any>(
      `${this.url}/resetPassword`,
      { email, password },
      {
        observe: 'response',
      }
    );
  };

  forgotPassword = (email: string): Observable<HttpResponse<any>> => {
    return this.http.post<any>(
      `${this.url}/forgotPassword`,
      { email },
      {
        observe: 'response',
      }
    );
  };
}
