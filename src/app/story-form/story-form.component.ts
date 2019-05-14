import { Component, OnInit } from '@angular/core';
import {Story} from "../story";
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DBSyncService } from '../dbsync.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})

export class StoryFormComponent implements OnInit {

  story = new Story();
  submitted = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private storyService: StoryService,
    private dbSyncService: DBSyncService
  ) { }
  
  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.route.params.subscribe(async params => {
      this.story.eventId = parseInt(params.eventId);
      const storyId = await this.storyService.addStory(this.story);
      this.router.navigateByUrl("/events/" + params.eventId + "/stories/" + storyId);
      this.dbSyncService.uploadContent('stories');
    })
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.story); }

}
