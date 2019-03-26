export class Story {
  id: number;
  eventId: number;
  name: string;
  description: string;
  images: object;
  
  constructor() {
    this.name = "";
    this.description = "";
    this.images = {};
  }
}