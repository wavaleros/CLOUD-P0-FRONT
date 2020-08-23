import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Constants from '../app.constants';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private access: string;
  private response: boolean;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(Constants.CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: any): any {
    return this.http.post(Constants.API_URL + Constants.REQUEST_TOKEN, JSON.stringify(user), this.httpOptions)
      .pipe(map((data) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const userObj = (JSON.parse(JSON.stringify(data)) as User);
        localStorage.removeItem(Constants.ACCESS);
        localStorage.removeItem(Constants.REFRESH);
        localStorage.setItem(Constants.ACCESS, userObj.access);
        localStorage.setItem(Constants.REFRESH, userObj.refresh);
        localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(userObj));
        this.currentUserSubject.next(userObj);
        return data;
      }));
  }

  refresh(token: string): any {
    const body = {refresh: token};
    return this.http.post(Constants.API_URL + Constants.REFRESH_TOKEN, body, this.httpOptions).subscribe(data => {
      this.currentUserSubject.value.access = (data as User).access;
      localStorage.setItem(Constants.ACCESS, (data as User).access);
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout(): any {
    // remove user from local storage to log user out
    localStorage.removeItem(Constants.ACCESS);
    localStorage.removeItem(Constants.REFRESH);
  }
}

