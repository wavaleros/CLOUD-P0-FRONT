import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as Paths from '../../app.paths';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventName: string;
  eventCategory: string;
  eventPlace: string;
  eventAddress: string;
  eventInitialDate: string;
  eventFinalDate: string;
  eventType: string;
  thumbnail: string;
  now: Date;
  eventInitialDateHour: string;
  eventFinalDateHour: string;
  eventTypeList: [string, string];
  eventCategoryList: [string, string, string, string];
  private id: string;

  constructor(public eventService: EventsService, public  router: Router, private activatedRoute: ActivatedRoute) {
    this.eventCategoryList = ['CONFERENCE', 'SEMINAR', 'CONGRESS', 'COURSE'];
    this.eventTypeList = ['VIRTUAL', 'PRESENCIAL'];
    this.eventCategory = this.eventCategoryList[0];
    this.eventType = this.eventTypeList[0];
    this.now = new Date();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });
    this.getById(this.id).subscribe(data => {
        this.eventName = data.content.event_name;
        this.eventCategory = data.content.event_category;
        this.eventPlace = data.content.event_place;
        this.eventInitialDate = data.content.event_initial_date.substring(0, data.content.event_initial_date.lastIndexOf('T'));
        this.eventFinalDate = data.content.event_final_date.substring(0, data.content.event_final_date.lastIndexOf('T'));
        this.eventAddress = data.content.event_address;
        this.eventInitialDateHour = data.content.event_initial_date.substring(data.content.event_initial_date.lastIndexOf('T') + 1,
          data.content.event_initial_date.length);
        this.eventFinalDateHour = data.content.event_final_date.substring(data.content.event_final_date.lastIndexOf('T') + 1,
          data.content.event_final_date.length);
        this.eventType = data.content.event_type;
        this.thumbnail = data.content.thumbnail;
      },
      err => {
        Swal.fire('Event lookup error', err.error, 'error');
      }
    );
  }

  updateEvent(): void {
    const tempInitialDate = JSON.parse(JSON.stringify(this.eventInitialDate));
    const tempFinalDate = JSON.parse(JSON.stringify(this.eventFinalDate));
    const eventDetail = {
      id: this.id,
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
    this.eventService.updateEvent(eventDetail).subscribe(event => {
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

  getById(id: string): any {
    return this.eventService.getEvent(id);
  }
}
