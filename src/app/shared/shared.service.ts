import { Injectable } from '@angular/core';
import { words } from 'src/assets/Dictionary/five-letter-words';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  checkIfWordExistsInLocalDictionary = (word: string) => {
    return words.includes(word);
  };

  isMobileScreen(): boolean {
    return window.innerWidth <= 768;
  }
}
