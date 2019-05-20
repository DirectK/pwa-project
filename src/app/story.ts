export class Story {
  id: number;
  eventId: number;
  name: string;
  description: string;
  images: object;
  sync: string;
  timestamp: number;
  lastUpdated: Date;
  synced: number;
  username: string;
  
  constructor(fields = {}) {
    this.name = "";
    this.description = "";
    this.images = {};
    this.sync = "";
    this.lastUpdated = new Date();
    this.synced = 0;

    Object.assign(this, fields);
  }
}