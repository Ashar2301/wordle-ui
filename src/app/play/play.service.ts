import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
  private url = environment.SERVER_API_URL;
  constructor(private http: HttpClient) {}

  generateGame = (gameType: string) => {
    const email: string = localStorage.getItem('userEmail')!;
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(`${this.url}/${gameType}`, {
      params,
      observe: 'response',
    });
  };

  registerAttempt = (attemptObject: any, gameType: string) => {
    return this.http.post<any>(
      `${this.url}/${gameType}/attempt`,
      attemptObject
    );
  };

  returnStats = (gameType: string) => {
    const email: string = localStorage.getItem('userEmail')!;
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(`${this.url}/stats/${gameType}`, {
      params,
      observe: 'response',
    });
  };
}
