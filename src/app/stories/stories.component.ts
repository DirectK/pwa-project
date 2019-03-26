import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';
import { ActivatedRoute } from '@angular/router';

import { Story } from '../story';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  eventId: number
  stories: Story[]

  constructor(private storyService: StoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( async params => {
      this.eventId = parseInt(params.eventId);
      this.stories = await this.storyService.getStories(this.eventId);
    });
  }

}