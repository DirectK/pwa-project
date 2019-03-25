import { Injectable } from '@angular/core';
import { Event } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Event[] = [
    { id: 1, name: 'Thundercat' },
    { id: 2, name: 'Mac Miller' },
    { id: 3, name: 'Some shitty rave who knows' },
  ];

  constructor() { }

  getEvents() {
    return this.events;
  }

  getEvent(eventId: number) {
    return this.events.find((event) => { return event.id == eventId });
  } 

}
