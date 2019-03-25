import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../mock-events';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: Event[]
  selectedEvent: Event

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
  }

}