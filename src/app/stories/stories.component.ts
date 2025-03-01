import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Story } from '../story';
import { DBSyncService } from '../dbsync.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

/** compoent containing list of stories */
export class StoriesComponent implements OnInit {

  eventId: number
  stories: Story[]

  constructor(
    private storyService: StoryService, 
    private route: ActivatedRoute,
    private dbSyncService: DBSyncService
  ) { }

  /** on initialisation, get list of stories from required
   * destination
   */
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.eventId = parseInt(params.eventId);

      this.dbSyncService.sync('stories').then(async () => {
        this.stories = await this.storyService.getStories(this.eventId);
        console.log(this.stories);
      });
    });
  }

}