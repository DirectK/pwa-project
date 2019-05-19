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
    this.xhr.open('POST', 'http://localhost:3000/authtest', true);
    this.xhr.setRequestHeader('Content-Type', 'application/json')
    this.xhr.withCredentials = true;
    let userDetails = {
      token: localStorage.getItem('jwtToken'),
    }
    this.xhr.send(JSON.stringify(userDetails))
    console.log('auth test sent w: token' + JSON.stringify(userDetails))
    console.log()

    this.xhr.onload = (event) => this.route()

    this.xhr.onerror = function() {
      console.log('There was an error!');
    };
  }

  route() {
    console.log('auth test recieved')
    let res = JSON.parse(this.xhr.response)
    console.log(res.success)
    if (res.success) {
      this.router.navigateByUrl('/events/add')
    }
  }


}
