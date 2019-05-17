import { Injectable } from '@angular/core';
import { IdbService } from './idb.service';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})

export class CommentServiceService {

  constructor(private idbService: IdbService) { }

  async getComments(eventId: number) {
    let idb = await this.idbService.getIdb();
    return idb.getAllFromIndex("comments", "eventId", eventId);
  }

  async addComment(comment: Comment) {
    const idb = await this.idbService.getIdb();
    return this.idbService.add("comments", comment)
  }

}
