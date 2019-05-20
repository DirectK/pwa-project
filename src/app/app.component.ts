import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA Project';
  username = localStorage.getItem('username')

  constructor(private router: Router) { }

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
