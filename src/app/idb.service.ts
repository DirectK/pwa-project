import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb/with-async-ittr.js';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private idbPromise: Promise<IDBPDatabase>

  events = [
    { name: 'Event 1', location: new L.LatLng(53.382180,-1.471185)},
    { name: 'Event 2', location: new L.LatLng(53.381110,-1.470085) },
    { name: 'Event 3', location: new L.LatLng(53.382130,-1.470085) }
  ];

  stories = [
    {eventId:1, name: 'cat' , description:'some description', images: null},
    {eventId:2, name: 'dog' , description:'some description', images: null},
    {eventId:3, name: 'sth' , description:'some description', images: null},
    {eventId:1, name: 'cat1' , description:'some description', images: null},
    {eventId:2, name: 'dog2' , description:'some description', images: null},
    {eventId:3, name: 'sth3' , description:'some description', images: null},
  ] 

  constructor() {
    this.openIdb();
  }

  openIdb() {
    let newInstance = false;
    this.idbPromise = openDB('pwa-idb', 1, {
      upgrade(idb) {
        const storeNames = Array.from(idb.objectStoreNames);
        if (!storeNames.includes("events")) {
          const os = idb.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
          os.createIndex('name', 'name', { unique: false });
          newInstance = true;
        }
        if (!storeNames.includes("stories")) {
          const os = idb.createObjectStore('stories', { keyPath: 'id', autoIncrement: true });
          os.createIndex('eventId', 'eventId', { unique: false });
        }
      }
    });
    this.idbPromise.then((idb) => {
      if (newInstance) {
        this.events.forEach(event => {
          idb.put("events", event);
        });
        this.stories.forEach(story => {
          idb.put("stories", story);
        });
      }
    })
  }

  getIdb() {
    return this.idbPromise
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
