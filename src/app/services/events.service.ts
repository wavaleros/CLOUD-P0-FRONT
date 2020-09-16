import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as Constants from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getEventList(): Observable<any> {
    return this.http.get(Constants.API_URL + Constants.EVENT_LIST, this.httpOptions);
  }

  createEvent(eventDetail: any): any {
    return this.http.post(Constants.API_URL + Constants.CREATE_EVENT, eventDetail, this.httpOptions);

  }

  getEvent(id: string): any {
    return this.http.get(Constants.API_URL + Constants.GET_EVENT + id, this.httpOptions);
  }

  deleteEvent(id: string): any {
    return this.http.delete(Constants.API_URL + Constants.GET_EVENT + id, this.httpOptions);
  }

  updateEvent(eventDetail: any): any {
    return this.http.put(Constants.API_URL + Constants.GET_EVENT + eventDetail.id, eventDetail, this.httpOptions);

  }
}
