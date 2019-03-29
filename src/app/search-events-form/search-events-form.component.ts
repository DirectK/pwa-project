import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-search-events-form',
  templateUrl: './search-events-form.component.html',
  styleUrls: ['./search-events-form.component.css']
})
export class SearchEventsFormComponent implements OnInit {

  constructor(private eventService: EventService, private eventComponent: EventComponent) { }

  input: string;
  lastInput: string;
  eventsFound: boolean = true;

  ngOnInit() {
  }

  async onSubmit() {
    this.lastInput = this.input;

    const result = await this.eventService.getEvents(this.input);
    this.eventsFound = !!result.length;

    this.eventComponent.events = result;
  }

}
