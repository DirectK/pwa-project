import { Injectable, OnInit } from '@angular/core';
import { Event } from './event';
import { IdbService } from './idb.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private idbService: IdbService) { }

  async getEvents() {
    let idb = await this.idbService.getIdb();
    return idb.getAll("events");
  }

  getEvent(eventId) {
    return this.idbService.getIdb().then(idb => idb.get("events", eventId));
  } 

}
