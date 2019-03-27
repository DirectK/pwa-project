import { Injectable, OnInit } from '@angular/core';
import { Event } from './event';
import { IdbService } from './idb.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private idbService: IdbService) { }

  async getEvents() {
    const idb = await this.idbService.getIdb();
    return idb.getAll("events");
  }

  async getEvent(eventId) {
    const idb = await this.idbService.getIdb();
    return idb.get("events", eventId);
  }

  async addEvent(event: Event) {
    const idb = await this.idbService.getIdb();
    return idb.add("events", event)
  }

}
