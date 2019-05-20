import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  async canActivate() {
    const authenticated = await this.isAuth();

    if (!authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  isAuth() {
    const userDetails = {
      token: localStorage.getItem('jwtToken'),
    }
    return new Promise<boolean>(resolve => {
      fetch('http://localhost:3000/authtest', {
        method: "post", 
        body: JSON.stringify(userDetails),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        if (res.status == 200) {
          res.json().then(json => resolve(json.success));
        }
      });
    })
  }

}
