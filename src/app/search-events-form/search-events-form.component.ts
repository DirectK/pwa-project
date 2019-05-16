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
    private eventComponent: EventComponent,
    private router: Router,
    private dbSyncService: DBSyncService,
    private route: ActivatedRoute
  ) { }

  input: string = '';
  lastInput: string;
  eventsFound: boolean = true;

  ngOnInit() {
    let search = this.route.snapshot.queryParams.search;
    if (search) {
      this.input = search;
      this.dbSyncService.sync('events').then(() => {
        this.performSearch(search);
        search = false;
      });
    }

    this.route.queryParamMap.subscribe(async queryParams => {
      if (!search) this.performSearch(queryParams.get('search'));
    })
  }

  async onSubmit() {
    if (this.input != this.lastInput) {
      let queryParams = {};
      if (this.input.length) queryParams = { search: this.input };
      this.router.navigate([], { queryParams });
    }
  }

  async performSearch(input) {
    const result = await this.eventService.getEvents(input);
    this.eventsFound = !!result.length;

    this.lastInput = this.input;
    this.eventComponent.events = result;
  }

}
