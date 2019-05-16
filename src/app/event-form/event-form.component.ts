import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Event } from "../event";
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { EventComponent } from '../event/event.component';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  @ViewChild("camVid")
  public camVid: ElementRef;
  @ViewChild("camCanvas")
  public camCanvas: ElementRef;

  event = new Event();
  submitted = false;
  imgData = null;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.event.location = new L.LatLng(50, -1);
  }

  async onSubmit() {
    this.snap()
    this.submitted = true;
    this.event.images = {img: this.imgData}
    const eventId = await this.eventService.addEvent(this.event);

    this.router.navigateByUrl("/events/" + eventId);
  }
  ngAfterViewInit() {
    var session = {
      video : true
    }
    navigator.mediaDevices.getUserMedia(session)
      .then(mediaStream => {
        this.camVid.nativeElement.srcObject = mediaStream;
        this.camVid.nativeElement.play()
      })
  }

  snap() {
    let context = 
      this.camCanvas.nativeElement.getContext("2d").drawImage(this.camVid.nativeElement, 0, 0, 320, 249)
      this.imgData = this.camCanvas.nativeElement.toDataURL('image/png')
      alert(this.imgData)
  }

  receiveMessage($event) {
    this.event.location = $event;
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.event); }

}