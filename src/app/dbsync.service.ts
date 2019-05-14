import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { IdbService } from './idb.service';

@Injectable({
  providedIn: 'root'
})
export class DBSyncService {

  private socket = io("http://localhost:3000");
  private stores = ['events', 'stories'];

  private syncPromises = {}; 

  constructor(private idbService: IdbService) { }

  async sync(store) {
    // sync when network available
    if (navigator.onLine) {
      if (this.socket.connected) {
        // perform syncing 
        await this.downloadContent(store);
        await this.uploadContent(store);
        await this.syncPromises[store];
      } else {
        // wait for socket connection to establish
        return new Promise((resolve) => {
          this.socket.on('connect', async function self() {
            await this.sync(store);
            this.socket.removeListener('connect', self);
  
            return resolve();
          }.bind(this));
        })
      }
    }
  }

  async uploadContent(store) {
    const idb = await this.idbService.getIdb();
    
    const index = idb.transaction(store).store.index('synced');
    let entries = [];

    for await (const cursor of index.iterate(0)) {
      entries.push(cursor.value);
    }

    const data = { store: store, value: entries }
    this.socket.emit('new', data, this.updateIndexedDB.bind(this));
  }

  async downloadContent(store) {
    const timestamp = await this.idbService.getLastTimestamp(store);
    const syncs = await this.idbService.getSyncs(store);

    const data = { state: 'download', store: store, timestamp: timestamp, syncs: syncs }
    this.syncPromises[store] = new Promise<void>(resolve => {
      this.socket.emit('sync', data, (storedData) => {
        this.updateIndexedDB(storedData).then(resolve);
      });
    })
  }

  async updateIndexedDB(data) {
    if (data) {
      if (this.stores.includes(data.store)) {
        const store = data.store;
        const docs = data.value;
        
        let promises = [];
        docs.forEach(doc => {
          promises.push(this.idbService.add(store, doc));
        });

        await Promise.all(promises);
      }
    }
  }



}
