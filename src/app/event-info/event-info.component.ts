import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event';
declare const lightGallery: any;

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  constructor(private eventService: EventService) { }

  event: Event;

  ngOnInit() {
    this.eventService.activeEvent.subscribe(event => this.event = event);
  }

}
