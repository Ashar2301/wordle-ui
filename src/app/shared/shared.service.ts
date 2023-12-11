import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { words } from 'src/assets/Dictionary/five-letter-words';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private url = environment.SERVER_API_URL;
  constructor(private http: HttpClient) {}

  checkIfWordExistsInLocalDictionary = (word: string) => {
    return words.includes(word);
  };

  isMobileScreen(): boolean {
    return window.innerWidth <= 768;
  }
}
