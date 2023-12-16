import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionStorageObject:SessionStorageService) { }

  public login(token: string): void {
    this.sessionStorageObject.store('user_credential', token);
  }

  public logout(): void {
    this.sessionStorageObject.clear('user_credential');
  }

  public isAuthenticated(): boolean {
    const token = this.sessionStorageObject.retrieve('user_credential');
    return token !== null;
  }
}
