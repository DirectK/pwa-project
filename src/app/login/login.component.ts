import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
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