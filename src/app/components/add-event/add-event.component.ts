import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {Router} from '@angular/router';
import * as Paths from '../../app.paths';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [DatePipe]
})
export class AddEventComponent implements OnInit {
  eventName: string;
  eventCategory: string;
  eventPlace: string;
  eventAddress: string;
  eventInitialDate: string;
  eventFinalDate: string;
  eventType: string;
  thumbnail: string;
  now: Date;
  dateControl: any;
  eventInitialDateHour: string;
  eventFinalDateHour: string;
  eventTypeList: [string, string];
  eventCategoryList: [string, string, string, string];

  constructor(public eventService: EventsService, public  router: Router, private datePipe: DatePipe) {
    this.eventCategoryList = ['CONFERENCE', 'SEMINAR', 'CONGRESS', 'COURSE'];
    this.eventTypeList = ['VIRTUAL', 'PRESENCIAL'];
    this.eventCategory = this.eventCategoryList[0];
    this.eventType = this.eventTypeList[0];
    this.now = new Date();
  }

  ngOnInit(): void {
  }

  createEvent(): any {
    const tempInitialDate = JSON.parse(JSON.stringify(this.eventInitialDate));
    const tempFinalDate = JSON.parse(JSON.stringify(this.eventFinalDate));
    const eventDetail = {
      event_name: this.eventName,
      event_category: this.eventCategory,
      event_place: this.eventPlace,
      event_initial_date: tempInitialDate.year + '-' + tempInitialDate.month + '-'
        + tempInitialDate.day + 'T' + this.eventInitialDateHour,
      event_final_date: tempFinalDate.year + '-' + tempFinalDate.month + '-'
        + tempFinalDate.day + 'T' + this.eventInitialDateHour,
      event_type: this.eventType,
      thumbnail: this.thumbnail,
      event_address: this.eventAddress
    };
    this.eventService.createEvent(eventDetail).subscribe(event => {
        this.router.navigateByUrl(Paths.EVENT_LIST).then();
      },
      err => {
        const message = '<p style="justify-content: left">' + JSON.stringify(err.error.message)
          .split('{').join('')
          .split('}').join('')
          .split('"').join('')
          .split('[').join('')
          .split(']').join('')
          .split(',').join('<br>') + '</p>';
        Swal.fire('Event creation error', message, 'error');
      }
    );

  }

}
