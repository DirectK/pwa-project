import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/** main class for the app,
 * 
 * the root of the web-page
 */
export class AppComponent implements OnInit {
  title = 'PWA Project';
  username = localStorage.getItem('username')

  constructor() { }

  /** attempting to update the shown username
   * on refresh
   */
  ngOnChanges() {
    this.username = localStorage.getItem('username')
  }

  logout() {
    localStorage.clear()
  }

  ngOnInit() {}

}
