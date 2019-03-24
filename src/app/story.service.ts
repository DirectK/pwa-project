import { Injectable } from '@angular/core';
import { Story } from './story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  stories: Story[] = [
    {eventid:1, id: 1, name: 'cat' , description:'lame', images: null},
    {eventid:2, id: 2, name: 'dog' , description:'lame', images: null},
    {eventid:3, id: 3, name: 'shit' , description:'lame', images: null},
  ] 

  constructor() { }

  getStories() {
    return this.stories;
  }
  
}
