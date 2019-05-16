import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Story } from "../story";
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})

export class StoryFormComponent implements OnInit {

  @ViewChild("camVid")
  public camVid: ElementRef;
  @ViewChild("camCanvas")
  public camCanvas: ElementRef;


  story = new Story();
  submitted = false;
  imgData = null;

  constructor(private router: Router, private route: ActivatedRoute, private storyService: StoryService) { }
  
  ngOnInit() {
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

  onSubmit() {
    this.submitted = true;
    this.story.images = {img: this.imgData}
    this.route.params.subscribe(async params => {
      this.story.eventId = parseInt(params.eventId);
      const storyId = await this.storyService.addStory(this.story);
      this.router.navigateByUrl("/events/" + params.eventId + "/stories/" + storyId);
    })
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.story); }

}
