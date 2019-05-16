import { Injectable } from '@angular/core';
import { Event } from './event';
import { IdbService } from './idb.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: BehaviorSubject<Event[]>;
  activeEvent: BehaviorSubject<Event>;

  constructor(private idbService: IdbService) {
    this.events = new BehaviorSubject(null);
    this.activeEvent = new BehaviorSubject(null);
  }

  async getEvents(input = null) {
    const idb = await this.idbService.getIdb();
    const tx  = idb.transaction("events");

    let result = null;
    if (input) {
      if (!input.search) input.search = '';
      const lowerKeyword = input.search.toLowerCase();
      result = [];

      for await (const cursor of tx.store) {
        const event = cursor.value;
        const value = event.name;
        if (typeof value === 'string' || value instanceof String) {
          if (!value.toLowerCase().includes(lowerKeyword)) continue;
          if (input.startTime && new Date(input.startTime) > new Date(event.startTime)) continue;
          if (input.endTime && new Date(input.endTime) < new Date(event.startTime)) continue;

          result.push(event);
        }
      }
    }

    return result || idb.getAll("events");
  }

  async getEvent(eventId: number) {
    const idb = await this.idbService.getIdb();
    return idb.get("events", eventId);
  }

  async addEvent(event: Event) {
    return this.idbService.add("events", event);
  }

}
