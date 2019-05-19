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

  async onSubmit() {
    this.xhr.open('POST', 'http://localhost:3000/login', true);
    this.xhr.setRequestHeader('Content-Type', 'application/json')
    let userDetails = {
      username: this.user.username,
      password: this.user.password
    }
    this.xhr.send(JSON.stringify(userDetails))
    console.log(JSON.stringify(userDetails) + ' sent')


    this.xhr.onload = (event) => this.route()

     this.xhr.onerror = function() {
       console.log('There was an error!');
     };
  }

  route() {
    let res = JSON.parse(this.xhr.response)
    this.router.navigateByUrl(res.route)
  }

  ngOnInit() {
    this.user.username = "yerr"
    this.user.password = "yerr"
  }

}