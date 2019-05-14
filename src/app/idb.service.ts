import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb/with-async-ittr.js';
import * as L from 'leaflet';
import { Event } from './event';
import { Story } from './story';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private idbPromise: Promise<IDBPDatabase>

  events = [
    // new Event({ name: 'Event 1', location: new L.LatLng(53.382180,-1.471185) }),
    // new Event({ name: 'Event 2', location: new L.LatLng(53.381110,-1.470085) }),
    // new Event({ name: 'Event 3', location: new L.LatLng(53.382130,-1.470085) })
  ];

  stories = [
    // new Story({eventId:1, name: 'cat' , description:'some description', images: null}),
    // new Story({eventId:2, name: 'dog' , description:'some description', images: null}),
    // new Story({eventId:3, name: 'sth' , description:'some description', images: null}),
    // new Story({eventId:1, name: 'cat1' , description:'some description', images: null}),
    // new Story({eventId:2, name: 'dog2' , description:'some description', images: null}),
    // new Story({eventId:3, name: 'sth3' , description:'some description', images: null}),
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
          os.createIndex('sync', 'sync', { unique: true });
          os.createIndex('synced', 'synced', { unique: false });
          os.createIndex('timestamp', 'timestamp', { unique: false });
          newInstance = true;
        }
        if (!storeNames.includes("stories")) {
          const os = idb.createObjectStore('stories', { keyPath: 'id', autoIncrement: true });
          os.createIndex('eventId', 'eventId', { unique: false });
          os.createIndex('sync', 'sync', { unique: true });
          os.createIndex('synced', 'synced', { unique: false });
          os.createIndex('timestamp', 'timestamp', { unique: false });
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

  add(storeName, value) {
    return new Promise((resolve, reject) => {
      this.idbPromise.then((idb) => {
        const db: IDBDatabase = unwrap(idb);
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const request = store.put(value);

        request.onsuccess = (event: {'target'}) => resolve(event.target.result);
        request.onerror = (event: {'target'}) => reject("error");
      })
    })
  }

  async getLastTimestamp(store) {
    const idb = await this.getIdb();
    const cursor = await idb.transaction(store).store.index('timestamp').openCursor(null, 'prev');

    while (cursor) {
      return cursor.value.timestamp;
    }

    return 0;
  }

  async getSyncs(store) {
    const idb = await this.getIdb();
    const docs = await idb.transaction(store).store.index('sync').getAll();

    return docs.map(doc => new Object({ sync: doc.sync, updated: doc.updated }) );
  }

}
