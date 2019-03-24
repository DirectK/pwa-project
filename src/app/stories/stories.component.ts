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

  stories: Story[]

  private eventId: number

  constructor(private storyService: StoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.eventId = params.eventId;
    })
    
    this.stories = this.storyService.getStories(this.eventId);
  }

  showStory(story: Story) {
  }

}
