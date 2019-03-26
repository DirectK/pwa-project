import { Component, OnInit } from '@angular/core';
import {Event} from "../event";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  event = new Event();

  submitted = false;

  onSubmit() {this.submitted = true;
  //add model to the event list, increment event id
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.event); }

  constructor() { }

  ngOnInit() {
  }

}
