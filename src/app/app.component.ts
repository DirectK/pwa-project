import { Component, OnInit } from '@angular/core';
import { DBSyncService } from './dbsync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA Project';

  constructor(private dbSyncService: DBSyncService) { }

  ngOnInit() {
  }

}
