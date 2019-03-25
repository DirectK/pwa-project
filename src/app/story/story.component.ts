import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  story: Story

  constructor(private route: ActivatedRoute, private storyService: StoryService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.story = this.storyService.getStory(params.storyId, params.eventId);
    })
  }

}
