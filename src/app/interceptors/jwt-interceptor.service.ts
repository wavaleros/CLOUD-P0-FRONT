import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication-service.service';
import {Observable} from 'rxjs';
import * as Constants from '../app.constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    if (request.url !== (Constants.API_URL + Constants.REQUEST_TOKEN)
      && request.url !== (Constants.API_URL + Constants.REFRESH_TOKEN)
      && !request.url.includes(Constants.CREATE_USER)) {
      this.authenticationService.refresh(this.authenticationService.currentUserValue.refresh);
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(Constants.ACCESS)}`,
          Accept: 'application/json, text/plain'
        })
      });
    }
    return next.handle(request);
  }
}
