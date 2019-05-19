import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-intermediary',
  templateUrl: './auth-intermediary.component.html',
  styleUrls: ['./auth-intermediary.component.css']
})
export class AuthIntermediaryComponent implements OnInit {

  xhr = new XMLHttpRequest

  constructor(private router: Router) { }

  ngOnInit() {
    this.xhr.open('GET', 'http://localhost:3000/authtest');
    this.xhr.withCredentials = true;
    this.xhr.send()
    console.log('auth test sent')

    this.xhr.onload = (event) => this.route()

    this.xhr.onerror = function() {
      console.log('There was an error!');
    };
  }

  route() {
    console.log('auth test recieved')
    let res = (this.xhr.response)
    console.log(res.success)
    if (res.success) {
      this.router.navigateByUrl('/events/add')
    }
  }


}
