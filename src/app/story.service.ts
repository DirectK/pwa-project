import { Injectable } from '@angular/core';
import { Story } from './story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  stories: Story[] = [
    {eventId:1, id: 1, name: 'cat' , description:'lame', images: null},
    {eventId:2, id: 2, name: 'dog' , description:'lame', images: null},
    {eventId:3, id: 3, name: 'shit' , description:'lame', images: null},
    {eventId:1, id: 4, name: 'cat1' , description:'lame', images: null},
    {eventId:2, id: 5, name: 'dog2' , description:'lame', images: null},
    {eventId:3, id: 6, name: 'shit3' , description:'lame', images: null},
  ] 

  constructor() { }

  getStory(storyId: number, eventId: number) {
    return this.stories.find(story => { return story.id == storyId && story.eventId == eventId });
  }

  getStories(eventId: number) {
    return this.stories.filter(story => { return story.eventId == eventId });
  }

}
