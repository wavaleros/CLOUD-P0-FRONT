import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: string;

  constructor() {
  }

  setToken(token: string): void {
    if (token) {
      this.jwtToken = token;
    }
  }
}
