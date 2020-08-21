import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Paths from '../../app.paths';
import {EventsService} from '../../services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  eventName: string;
  eventCategory: string;
  eventPlace: string;
  eventInitialDate: string;
  eventFinalDate: string;
  eventAddress: string;
  eventType: string;
  eventThumbnail: string;
  id: string;
  allDataFetched = false;

  constructor(public router: Router, public eventsService: EventsService) {
    const navigator = this.router.getCurrentNavigation();
    const state = navigator.extras.state as {
      id: string;
    };
    this.id = state.id;
  }

  ngOnInit(): void {
    this.getById(this.id).subscribe(data => {
        this.eventName = data.content.event_name;
        this.eventCategory = data.content.event_category;
        this.eventPlace = data.content.event_place;
        this.eventInitialDate = data.content.event_initial_date;
        this.eventFinalDate = data.content.event_final_date;
        this.eventAddress = data.content.event_address;
        this.eventType = data.content.event_type;
        this.eventThumbnail = data.content.thumbnail;
        this.allDataFetched = true;
      },
      err => {
        Swal.fire('Event lookup error', err.error, 'error');
      }
    );
  }

  backToEventList(): void {
    this.router.navigateByUrl(Paths.EVENT_LIST).then();
  }

  getById(id: string): any {
    return this.eventsService.getEvent(id);
  }
}
