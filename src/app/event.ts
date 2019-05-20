import * as L from 'leaflet';

/** event class */
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
    lastUpdated: Date;
    synced: number;

    constructor(fields = {}) {
        this.name = "";
        this.description = "";
        this.images = {};
        this.startTime = null;
        this.endTime = null;
        this.keywords = [];
        this.sync = "";
        this.timestamp = null;
        this.synced = 0;
        this.lastUpdated = new Date();

        Object.assign(this, fields);
    }
}