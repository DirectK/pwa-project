import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Story } from "../story";
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DBSyncService } from '../dbsync.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})

/**
 * Handles the submission and saving of stories
 * including webRTC images.
 */

export class StoryFormComponent implements OnInit, OnDestroy {

  @ViewChild("camVid")
  public camVid: ElementRef;
  @ViewChild("camCanvas")
  public camCanvas: ElementRef;


  story = new Story();
  submitted = false;
  imgData = null;
  videoActive = false;
  images = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private storyService: StoryService,
    private dbSyncService: DBSyncService
  ) { }
  
  ngOnInit() {
  }


  /**turns off camera on destruction of the form*/
  ngOnDestroy() {
    this.disableCamera();
  } 
  
  /**saves the event and routes the user to the event itself */
  onSubmit() {
    this.submitted = true;
    this.story.images = this.images;
    this.route.params.subscribe(async params => {
      this.story.eventId = parseInt(params.eventId);
      const storyId = await this.storyService.addStory(this.story);
      this.router.navigateByUrl("/events/" + params.eventId + "/stories/" + storyId);
      this.dbSyncService.uploadContent('stories');
    })
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

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.story); }

}
