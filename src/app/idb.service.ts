import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  constructor() { }
}
