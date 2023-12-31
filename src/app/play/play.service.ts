import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDailyGames, IRandomGames } from '../shared/interfaces/games.model';
import { IStatisticsObject } from '../shared/interfaces/stats.model';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
  private url = environment.SERVER_API_URL;
  private randomIsHardMode: boolean = false;
  private dailyIsHardMode: boolean = false;

  constructor(private http: HttpClient) {}

  generateGame = (gameType: string): Observable<HttpResponse<IRandomGames | IDailyGames>> => {
    const params = new HttpParams()
      .set(
        'hardMode',
        gameType === 'daily' ? this.dailyIsHardMode : this.randomIsHardMode
      );
    return this.http.get<IRandomGames | IDailyGames>(`${this.url}/${gameType}`, {
      params,
      observe: 'response',
    });
  };

  registerAttempt = (attemptObject: any, gameType: string): Observable<HttpResponse<any>> => {
    return this.http.post<any>(
      `${this.url}/${gameType}/attempt`,
      attemptObject
    );
  };

  returnStats = (gameType: string): Observable<HttpResponse<IStatisticsObject>> => {
    return this.http.get<IStatisticsObject>(`${this.url}/stats/${gameType}`, {
      observe: 'response',
    });
  };

  returnAnswerWord = (gameType: string, gameId: number): Observable<HttpResponse<any>> => {
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
