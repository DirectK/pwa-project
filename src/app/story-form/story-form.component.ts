import { Component, OnInit } from '@angular/core';
import {Story} from "../story";
import { StoryService } from '../story.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {

  story = new Story();
  submitted = false;

  constructor(private route: ActivatedRoute, private storyService: StoryService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.route.params.subscribe((params) => {
      this.story.eventId = parseInt(params.eventId);
      this.storyService.addStory(this.story);
    })
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.story); }

}
