import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})

/** component for showing the details of
 * the selected event
 */
export class EventInfoComponent implements OnInit {
  
  event;
  
  constructor(private eventService: EventService) { }

  /**gets all the required event details from the
   * event service  */
  ngOnInit() {
    this.eventService.activeEvent.subscribe(event => {
      this.event = event;

      this.event.startTime = new Date(event.startTime);
      this.event.endTime = new Date(event.endTime);
      this.event.timestamp = new Date(event.timestamp).toLocaleDateString();

      this.event.startTime.setSeconds(0, 0);
      this.event.endTime.setSeconds(0, 0);

      this.event.startTime = this.event.startTime.toLocaleString();
      this.event.endTime = this.event.endTime.toLocaleString();
    });
  }

}
