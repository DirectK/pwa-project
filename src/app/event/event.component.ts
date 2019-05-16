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
  searchInput: string;

  constructor(
    private eventService: EventService,
    private dbSyncService: DBSyncService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mapEnabled = false;
    this.events = this.eventService.events;
    if (!this.route.snapshot.queryParams.search) {
      this.dbSyncService.sync('events').then(async () => {
        this.eventService.events.next(await this.eventService.getEvents());
      });
    }
    this.route.queryParamMap.subscribe(params => {
      this.searchInput = params.get('search');
    })
  }

  toggleMap() {
    this.mapEnabled = !this.mapEnabled;
  }

}