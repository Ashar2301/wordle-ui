import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { words } from 'src/assets/Dictionary/five-letter-words';
import { environment } from 'src/environments/environment';
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
