import { Component, OnInit } from '@angular/core';
import { Story } from '../story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  story: Story

  constructor() { }

  ngOnInit() {
  }

}
