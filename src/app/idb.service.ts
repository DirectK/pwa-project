import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb/with-async-ittr.js';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private idbPromise: Promise<IDBPDatabase>

  events = [
    { name: 'Thundercat', location: new L.LatLng(53.382180,-1.471185)},
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

  comments = [
    {storyid:1, text:'SHIT!'}
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
          const os = idb.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
          os.createIndex('name', 'name', { unique: false });
        }
        if (!storeNames.includes("stories")) {
          const os = idb.createObjectStore('stories', { keyPath: 'id', autoIncrement: true });
          os.createIndex('eventId', 'eventId', { unique: false });
        }
        if (!storeNames.includes("comments")) {
          const os = idb.createObjectStore('comments', { keyPath: 'id', autoIncrement: true });
          os.createIndex('storyId', 'storyId', { unique: false });
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
      this.stories.forEach(comment => {
        idb.put("comments", comment);
      });
    })
  }

  getIdb() {
    return this.idbPromise;
  }

  add(idb, storeName, value) {
    const db: IDBDatabase = unwrap(idb);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.add(value);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: {'target'}) => resolve(event.target.result);
      request.onerror = (event: {'target'}) => reject("error");
    })
  }

}
