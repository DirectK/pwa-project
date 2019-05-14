import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';
import { ActivatedRoute } from '@angular/router';

import { Story } from '../story';
import { DBSyncService } from '../dbsync.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  eventId: number
  stories: Story[]

  constructor(
    private storyService: StoryService, 
    private route: ActivatedRoute,
    private dbSyncService: DBSyncService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = parseInt(params.eventId);

      this.dbSyncService.sync('stories').then(async () => {
        this.stories = await this.storyService.getStories(this.eventId);
      });
    });
  }

}