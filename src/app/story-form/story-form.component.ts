import { Component, OnInit } from '@angular/core';
import {Story} from "../story";

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {

  story = new Story();
  submitted = false;
  

  onSubmit() {this.submitted = true;
    //add model to the event list, increment event id
    }
  
    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.story); }

  constructor() { }

  ngOnInit() {
  }

}
