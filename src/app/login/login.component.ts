import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { User } from '../user';
import { HttpClient, XhrFactory } from '@angular/common/http';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user = new User();
  submitted = false;
  xhr = new XMLHttpRequest

  constructor(private router: Router) { }

  /** submit login request */
  async onSubmit() {

    //create HTTP request
    this.xhr.open('POST', 'http://localhost:3000/login', true);
    this.xhr.setRequestHeader('Content-Type', 'application/json')
    this.xhr.withCredentials = true;
    let userDetails = {
      username: this.user.username,
      password: this.user.password
    }
    this.xhr.send(JSON.stringify(userDetails))
    console.log(JSON.stringify(userDetails) + ' sent')

    //wait for response
    this.xhr.onload = (event) => this.route()

    //handle error
    this.xhr.onerror = function() {
      console.log('There was an error!');
    };
  }

  /** helper method for http response,
   * routing the user
   */
  route() {
    let res = JSON.parse(this.xhr.response)
    localStorage.setItem('jwtToken', res.token);
    localStorage.setItem('username', this.user.username);
    this.router.navigateByUrl(res.route)
  }

  ngOnInit() {
    this.user.username = ""
    this.user.password = ""
  }

}