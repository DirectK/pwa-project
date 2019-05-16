import { TestBed } from '@angular/core/testing';

import { DBSyncService } from './dbsync.service';

describe('DBSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBSyncService = TestBed.get(DBSyncService);
    expect(service).toBeTruthy();
  });
});
