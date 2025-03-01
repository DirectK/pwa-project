import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient, XhrFactory } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User();
  submitted = false;
  xhr = new XMLHttpRequest;
  success;

  constructor() { }

  /** submit signup request */
  async onSubmit() {
    
    //create HTTP request
    this.xhr.open('POST', 'http://localhost:3000/signup', true);
    this.xhr.setRequestHeader('Content-Type', 'application/json')
    this.xhr.withCredentials = true;
    let userDetails = {
      username: this.user.username,
      password: this.user.password
    }
    this.xhr.send(JSON.stringify(userDetails))

    this.success = 'User created successfully';

    //wait for response
    this.xhr.onload = function() {
      let responseText = this.response;
      console.log(responseText);
      console.log('cors recieved')
      // process the response.
    };
    
    //handle error
    this.xhr.onerror = function() {
      console.log('There was an error!');
    };
  }

  /** set default values */
  ngOnInit() {
  }

}
