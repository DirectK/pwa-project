import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { Story } from '../story';
import { STORIES } from '../mock-stories';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  stories = STORIES;

  @Input() event: Event;

  constructor() { }

  ngOnInit() {
  }

}
