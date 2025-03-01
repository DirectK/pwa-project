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

/** component for showing the details of
 * the selected event
 */
export class EventDetailComponent implements OnInit {

  stories: Story[]
  event: Event

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( async params => {
      this.event = await this.eventService.getEvent(parseInt(params.eventId));
      this.eventService.events.next(null);
      this.eventService.activeEvent.next(this.event);
    });
  }

}
