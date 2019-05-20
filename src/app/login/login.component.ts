import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user = new User();
  submitted = false;
  xhr = new XMLHttpRequest
  error = null;

  constructor(private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  /** submit login request */
  async onSubmit() {
    let userDetails = {
      username: this.user.username,
      password: this.user.password
    }

    //create HTTP request
    fetch('http://localhost:3000/login', {
      method: "post", 
      body: JSON.stringify(userDetails),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status == 200) {
        res.json().then(jsonRes => this.route(jsonRes));
      } else {
        this.error = 'Username or password incorrect.';
      }
    });
  }

  /** helper method for http response,
   * routing the user
   */
  route(res) {
    localStorage.setItem('jwtToken', res.token);
    localStorage.setItem('username', this.user.username);
    this.appComponent.username = this.user.username;
    this.router.navigateByUrl(res.route);
  }

}