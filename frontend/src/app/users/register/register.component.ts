import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {};

  constructor(private _users: UsersService, private _router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this._users.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res),
          localStorage.setItem('token', res.token), //setting an item with token which has given by the browser into local stroage
          this._router.navigate(['/product']);
      },
      (err) => console.log(err)
    );
  }
}
