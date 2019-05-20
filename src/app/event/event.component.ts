import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { DBSyncService } from '../dbsync.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: BehaviorSubject<Event[]>;
  mapEnabled: boolean;
  search: string;
  startTime: string;
  endTime: string;

  constructor(
    private eventService: EventService,
    private dbSyncService: DBSyncService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mapEnabled = false;
    this.events = this.eventService.events;

    this.route.queryParamMap.subscribe(params => {
      
      this.search = params.get('search');

      const startTime = params.get('startTime');
      this.startTime = startTime ? new Date(startTime).toDateString() : null;

      const endTime = params.get('endTime');
      this.endTime = endTime ? new Date(endTime).toDateString() : null;
    })
  }

  toTime(time) {
    return new Date(time).toLocaleString();
  }

  toggleMap() {
    this.mapEnabled = !this.mapEnabled;
  }

}