import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  stories: Story[]
  event: Event

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.event = this.eventService.getEvent(params.eventId);
    })
  }

}
