import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stories: Story[]

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.stories = this.storyService.getStories();
  }

  showStory(story: Story) {
  }

}