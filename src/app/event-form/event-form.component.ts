import { Component, OnInit } from '@angular/core';
import { Event } from "../event";
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { EventComponent } from '../event/event.component';

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
    this.event.location = new L.LatLng(50, -1);
  }

  onSubmit() {
    this.submitted = true;
    this.eventService.addEvent(this.event);
  }

  receiveMessage($event) {
    this.event.location = $event;
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.event); }

}
