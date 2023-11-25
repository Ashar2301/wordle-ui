import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
  private url = environment.SERVER_API_URL;
  private randomIsHardMode: boolean = false;
  private dailyIsHardMode: boolean = false;

  constructor(private http: HttpClient) {}

  generateGame = (gameType: string) => {
    const email: string = localStorage.getItem('userEmail')!;
    const params = new HttpParams()
      .set('email', email)
      .set(
        'hardMode',
        gameType === 'daily' ? this.dailyIsHardMode : this.randomIsHardMode
      );
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

  returnAnswerWord = (gameType: string, gameId: number) => {
    const email: string = localStorage.getItem('userEmail')!;
    const params = new HttpParams()
      .set('email', email)
      .set('gameType', gameType)
      .set('gameId', gameId);
    return this.http.get<any>(`${this.url}/stats/answerWord`, {
      params,
      observe: 'response',
    });
  };

  setRandomHardMode = (val: boolean) => {
    this.randomIsHardMode = val;
  };
  setDailyHardMode = (val: boolean) => {
    this.dailyIsHardMode = val;
  };
}
