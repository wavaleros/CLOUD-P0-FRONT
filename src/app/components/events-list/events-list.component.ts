import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {Event} from '../../models/event';
import {Router} from '@angular/router';
import * as Paths from '../../app.paths';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  eventList: any;
  currentEvent: Event;
  currentIndex: number;

  constructor(private eventService: EventsService, public router: Router) {
  }

  ngOnInit(): void {
    this.getEventList();
  }

  getEventList(): void {
    this.eventService.getEventList().subscribe(data => {
      this.eventList = data.content;
    });
  }

  setActiveEvent(event: Event, i: number): void {
    this.currentEvent = event;
    this.currentIndex = i;
  }

  addNewEvent(): void {
    this.router.navigateByUrl(Paths.ADD_EVENT).then();
  }

  viewEventDetails(id: string): void {
    this.router.navigateByUrl(Paths.VIEW_EVENT.replace(':id', id), {state: {id}}).then();
  }

  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  editEvent(id: string): void {
    this.router.navigateByUrl(Paths.UPDATE_EVENT.replace(':id', id), {state: {id}}).then();
  }
}
