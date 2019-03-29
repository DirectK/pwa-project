import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private idbPromise: Promise<IDBPDatabase>

  events = [
    { name: 'Thundercat', location: new L.LatLng(53.381150,-1.470085)},
    { name: 'Mac Miller', location: new L.LatLng(53.381110,-1.470085) },
    { name: 'Some shitty rave who knows', location: new L.LatLng(53.382130,-1.470085) }
  ];

  stories = [
    {eventId:1, name: 'cat' , description:'lame', images: null},
    {eventId:2, name: 'dog' , description:'lame', images: null},
    {eventId:3, name: 'shit' , description:'lame', images: null},
    {eventId:1, name: 'cat1' , description:'lame', images: null},
    {eventId:2, name: 'dog2' , description:'lame', images: null},
    {eventId:3, name: 'shit3' , description:'lame', images: null},
  ] 

  constructor() {
    this.openIdb();
  }

  openIdb() {
    deleteDB('pwa-idb');
    this.idbPromise = openDB('pwa-idb', 1, {
      upgrade(idb) {
        let storeNames = Array.from(idb.objectStoreNames);
        if (!storeNames.includes("events")) {
          idb.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
        }
        if (!storeNames.includes("stories")) {
          let os = idb.createObjectStore('stories', { keyPath: 'id', autoIncrement: true });
          os.createIndex('eventId', 'eventId', { unique: false });
        }
      }
    });
    this.idbPromise.then((idb) => {
      this.events.forEach(event => {
        idb.put("events", event);
      });
      this.stories.forEach(story => {
        idb.put("stories", story);
      });
    })
  }

  getIdb() {
    return this.idbPromise
  }

}
