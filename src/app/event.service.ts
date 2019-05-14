import { Injectable } from '@angular/core';
import { Event } from './event';
import { IdbService } from './idb.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private idbService: IdbService) { }

  async getEvents(keyword: string = '') {
    const idb = await this.idbService.getIdb();
    const tx  = idb.transaction("events");

    let result = null;
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      result = [];

      for await (const cursor of tx.store) {
        const event = cursor.value;
        const value = event.name;
        if (typeof value === 'string' || value instanceof String) {
          if (value.toLowerCase().includes(lowerKeyword)) {
            result.push(event);
          } 
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
