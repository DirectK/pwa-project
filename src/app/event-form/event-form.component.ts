import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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

/**
 * Handles the saving and submission of new events,
 * including webRTC images.
 */
export class EventFormComponent implements OnInit, OnDestroy {

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

  /**sets default event location pin */
  ngOnInit() {
    this.event.location = new L.LatLng(50, -1);
  }

  /**turns off camera on destruction of the form*/
  ngOnDestroy() {
    this.disableCamera();
  }

  /**saves the event and routes the user to the event itself */
  async onSubmit() {
    this.snap()
    this.submitted = true;
    this.event.images = this.images;
    this.event.username = localStorage.getItem('username');
    const eventId = await this.eventService.addEvent(this.event);

    this.router.navigateByUrl("/events/" + eventId);
    this.dbSyncService.uploadContent('events');
  }

  /**initialises webRTC camera */
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

  /** stops camera */
  disableCamera() {
    this.videoActive = false;
    if (this.camVid.nativeElement.srcObject) {
      this.camVid.nativeElement.srcObject.getTracks().forEach(track => track.stop());
    }
  }

  /** wipes image */
  unsnap() {
    this.imgData = null;
  }

/**takes snap of webRTC image */
  snap() {
    const canvas = this.camCanvas.nativeElement;
    const width = this.camVid.nativeElement.videoWidth;
    const height = this.camVid.nativeElement.videoHeight;

    canvas.width = width;
    canvas.height = height;
    this.camCanvas.nativeElement.getContext("2d").drawImage(this.camVid.nativeElement, 0, 0);
    this.imgData = this.camCanvas.nativeElement.toDataURL('image/png');
  }

  /** save snap to event */
  saveImage() {
    this.images.push({ dataURL: this.imgData });
    this.imgData = null;
  }

  /** remove image from event */
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