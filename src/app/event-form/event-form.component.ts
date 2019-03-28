import { Component, OnInit } from '@angular/core';
import { Event } from "../event";
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  event = new Event();
  submitted = false;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    const eventId = await this.eventService.addEvent(this.event);
    this.router.navigateByUrl("/events/" + eventId);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.event); }

}
