import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { DBSyncService } from '../dbsync.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  
  events: Event[]
  selectedEvent: Event

  constructor(private eventService: EventService, private dbSyncService: DBSyncService) { }

  ngOnInit() {
    this.dbSyncService.sync('events').then(async () => {
      this.events = await this.eventService.getEvents();
    });
  }

}