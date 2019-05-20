import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  /** attempting to update the shown username
   * on refresh
   */
  ngOnChanges() {
    this.username = localStorage.getItem('username')
  }

  logout() {
    this.username = null;
    localStorage.clear()
    this.router.navigate(['/events'])
  }

  ngOnInit() {}

}
