import { Component, OnInit, Input } from '@angular/core';
import { STORIES } from '../mock-stories';
import { Story } from '../story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() story: Story;

  constructor() { }

  ngOnInit() {
  }

}
