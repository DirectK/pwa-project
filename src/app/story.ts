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
  
  constructor(fields = {}) {
    this.name = "";
    this.description = "";
    this.images = {};
    this.sync = "";
    this.lastUpdated = new Date("December 17, 1995 03:24:00");
    this.synced = 0;

    Object.assign(this, fields);
  }
}