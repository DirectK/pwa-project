import { Injectable } from '@angular/core';
import { IdbService } from './idb.service';
import { Story } from './story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private idbService: IdbService) { }

  async getStory(storyId: number) {
    let idb = await this.idbService.getIdb();
    return idb.get("stories", storyId);
  }

  async getStories(eventId: number) {
    let idb = await this.idbService.getIdb();
    return idb.getAllFromIndex("stories", "eventId", eventId);
  }

  async addStory(story: Story) {
    return this.idbService.add("stories", story)
  }

}
