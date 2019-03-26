export class Event {
    id : number;
    name: string;
    description: string;
    images: object;
    startTime: Date;
    endTime: Date;
    location: object;
    keywords: string[];
    //date, keywords, and location
    constructor() {
        this.name = "";
        this.description = "";
        this.images = {};
        this.startTime = new Date();
        this.endTime = new Date();
        this.location = {};
        this.keywords = [];
    }
}