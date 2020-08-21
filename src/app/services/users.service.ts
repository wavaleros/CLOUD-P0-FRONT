import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as Constants from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private response: Observable<any>;

  constructor(private http: HttpClient) {
  }

  getToken(user: any): Observable<any> {
    return this.http.post(Constants.API_URL + Constants.REQUEST_TOKEN, JSON.stringify(user), this.httpOptions);
  }

  setToken(token: string): void {
    console.log('Saving token :' + token);
  }

  createUser(userData: any): any {
    return this.http.post(Constants.API_URL + Constants.CREATE_USER, JSON.stringify(userData), this.httpOptions);
  }
}
