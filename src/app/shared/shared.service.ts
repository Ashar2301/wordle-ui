import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { words } from 'src/assets/Dictionary/five-letter-words';
import { environment } from 'src/environments/environment';
import { IBugReport } from './interfaces/bug,model';
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

  uploadBug = (bug: IBugReport): Observable<HttpResponse<any>> => {
    const formData = new FormData();
    formData.append('description', bug.description);
    formData.append('file', bug.file);
    return this.http.post<HttpResponse<IBugReport>>(
      `${this.url}/report-bug`,
      formData
    );
  };
}
