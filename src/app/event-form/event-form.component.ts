import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Event } from "../event";
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { DBSyncService } from '../dbsync.service';
import { EventComponent } from '../event/event.component';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';

declare const lightGallery: any;

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
  @ViewChild("gallery")
  public gallery: ElementRef;

  event = new Event();
  submitted = false;
  imgData = null;
  images = [];
  videoActive = false;

  constructor(private eventService: EventService, private router: Router, private dbSyncService: DBSyncService) { }

  ngOnInit() {
    this.event.location = new L.LatLng(50, -1);
  }

  async onSubmit() {
    this.snap()
    this.submitted = true;
    this.event.images = this.images;
    const eventId = await this.eventService.addEvent(this.event);

    this.router.navigateByUrl("/events/" + eventId);
    this.dbSyncService.uploadContent('events');
  }

  enableCamera() {
    var session = {
      video : true
    }
    navigator.mediaDevices.getUserMedia(session)
      .then(mediaStream => {
        this.videoActive = true;
        this.camVid.nativeElement.srcObject = mediaStream;
        this.camVid.nativeElement.play();
      })
  }

  unsnap() {
    this.imgData = null;
  }

  snap() {
    const canvas = this.camCanvas.nativeElement;
    const width = this.camVid.nativeElement.videoWidth;
    const height = this.camVid.nativeElement.videoHeight;

    canvas.width = width;
    canvas.height = height;
    this.camCanvas.nativeElement.getContext("2d").drawImage(this.camVid.nativeElement, 0, 0);
    this.imgData = this.camCanvas.nativeElement.toDataURL('image/png');
  }

  saveImage() {
    this.images.push({ dataURL: this.imgData });
    this.imgData = null;
  }

  removeImage(event) {
    const target = event.target.parentNode.parentNode.parentNode.firstChild;
    this.images = this.images.filter(image => target.src != image.dataURL);
  }

  receiveMessage($event) {
    this.event.location = $event;
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.event); }

}