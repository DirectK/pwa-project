import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username;
  pw;

  constructor(private api: ApiService, private customer: CustomerService, private router: Router) {
  }

  tryLogin() {
    this.api.login(
      this.username,
      this.pw
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/events');
          }
        },
        r => {
          alert(r.error.error);
        });
export class LoginComponent implements OnInit {

  user = new User();
  submitted = false;

  constructor() { }

  async onSubmit() {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(this.user)
    })
  }

  ngOnInit() {
    this.user.username = "butt"
    this.user.password = "butt"
  }

}