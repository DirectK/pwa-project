import * as L from 'leaflet';

export class Event {
    id : number;
    name: string;
    description: string;
    images: object;
    startTime: Date;
    endTime: Date;
    location: L.LatLng;
    keywords: string[];
    sync: string;
    timestamp: number;
    synced: number;

    constructor(fields = {}) {
        this.name = "";
        this.description = "";
        this.images = {};
        this.startTime = new Date();
        this.endTime = new Date();
        this.keywords = [];
        this.sync = "";
        this.timestamp = null;
        this.synced = 0;

        Object.assign(this, fields);
    }
}