import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventComponent } from '../event/event.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DBSyncService } from '../dbsync.service';

@Component({
  selector: 'app-search-events-form',
  templateUrl: './search-events-form.component.html',
  styleUrls: ['./search-events-form.component.css']
})
export class SearchEventsFormComponent implements OnInit {

  constructor(
    private eventService: EventService, 
    private router: Router,
    private dbSyncService: DBSyncService,
    private route: ActivatedRoute,
    public eventsComponent: EventComponent
  ) { }

  search: string = '';
  startTime: Date;
  endTime: Date;
  lastInput: {
    search: string,
    startTime: Date,
    endTime: Date
  };
  eventsFound: boolean = true;

  ngOnInit() {
    let syncNeeded = true;
    this.route.queryParamMap.subscribe(async queryParams => {
      const input = {
        search: queryParams.get('search'),
        startTime: queryParams.get('startTime'),
        endTime: queryParams.get('endTime')
      }

      this.search = input.search;
      if (input.startTime) this.startTime =  new Date(input.startTime);
      if (input.endTime) this.endTime = new Date(input.endTime);

      if (syncNeeded) {
        this.dbSyncService.sync('events').then(() => this.performSearch(input));
        syncNeeded = false;
      } else {
        this.performSearch(input);
      }
    })
  }

  async onSubmit() {
    const newSearch = this.search != this.lastInput.search ||
      this.startTime != this.lastInput.startTime ||
      this.endTime != this.lastInput.endTime;

    if (newSearch) {
      let queryParams = {};
      queryParams = {
        search: this.search && this.search.length ? this.search : null,
        startTime: this.startTime ? this.startTime.toDateString() : null,
        endTime: this.endTime ? this.endTime.toDateString() : null
      };
      this.router.navigate([], { queryParams });
    }
  }

  async performSearch(input) {
    const result = await this.eventService.getEvents(input);
    this.eventsFound = !!result.length;

    this.lastInput = input;
    this.eventService.events.next(result);
  }

  toggleMap() {
    this.eventsComponent.mapEnabled = !this.eventsComponent.mapEnabled;
  }

}
