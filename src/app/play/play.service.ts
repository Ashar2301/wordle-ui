import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
  private url = environment.SERVER_API_URL;
  private randomIsHardMode: boolean = false;
  private dailyIsHardMode: boolean = false;

  constructor(private http: HttpClient) {}

  generateGame = (gameType: string) => {
    const params = new HttpParams()
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
    return this.http.get<any>(`${this.url}/stats/${gameType}`, {
      observe: 'response',
    });
  };

  returnAnswerWord = (gameType: string, gameId: number) => {
    const params = new HttpParams()
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
