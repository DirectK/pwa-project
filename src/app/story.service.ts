import { Injectable } from '@angular/core';
import { Story } from './story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  stories: Story[] = [
    {id: 1, name: "Story1", description: "Story1 description", images: {}},
    {id: 2, name: "Story2", description: "Story2 description", images: {}},
    {id: 3, name: "Story3", description: "Story3 description", images: {}}
  ] 

  constructor() { }

  getStories() {
    return this.stories;
  }
  
}
