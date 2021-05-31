import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUserData: any = {};

  constructor(private _user: UsersService, private _router: Router) {}

  ngOnInit(): void {}
  /*passing user data form user service and only calling is not enough we need to subscribe to the observale
    -----Angular makes use of observables as an interface to handle a variety of common asynchronous operations
    example
    You can define custom events that send observable output data from a child to a parent component.
    The HTTP module uses observables to handle AJAX requests and responses.
    The Router and Forms modules use observables to listen for and respond to user-input events.------*/
  loginUser() {
    this._user.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log(res),
          localStorage.setItem('token', res.token),
          this._router.navigate(['/product']);
      },
      (err) => console.log(err)
    );
  }
}
