import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { IdbService } from './idb.service';

@Injectable({
  providedIn: 'root'
})
export class DBSyncService {

  private socket = io("http://localhost:3000");
  private stores = ['events', 'stories'];

  private syncPromise: Promise<void>; 

  constructor(private idbService: IdbService) { }

  sync() {
    if (!navigator.onLine) {
      this.syncPromise = Promise.resolve();
      return;
    }

    this.socket.on('connect', () => {
      this.downloadContent().then(() => this.uploadContent());
    });
    this.syncPromise = new Promise(resolve => {
      this.socket.on('sync', (data) => {
        if (data) {
          if (data.status == 'pending' && this.stores.includes(data.type)) {
            const store = data.type;
            const docs = data.value;

            docs.forEach(doc => {
              this.idbService.add(store, doc);
            });
          } else if (data.status == 'complete') {
            resolve();
          }
        }
      })
    })
  }

  syncComplete() {
    return this.syncPromise;
  }

  async uploadContent() {
    const idb = await this.idbService.getIdb();

    this.stores.forEach(async store => {
      const index = idb.transaction(store).store.index('synced');
      let entries = [];

      for await (const cursor of index.iterate(0)) {
        entries.push(cursor.value);
      }

      this.socket.emit('new', {
        type: store,
        value: entries
      })
    });
  }

  async downloadContent() {
    this.stores.forEach(async store => {
      const timestamp = await this.getLastTimestamp(store);

      this.socket.emit('sync', {
        type: store,
        timestamp: timestamp
      })
    })
  }

  private async getLastTimestamp(store) {
    const idb = await this.idbService.getIdb();
    const cursor = await idb.transaction(store).store.index('timestamp').openCursor(null, 'prev');

    while (cursor) {
      return cursor.value.timestamp;
    }

    return 0;
  }

}
