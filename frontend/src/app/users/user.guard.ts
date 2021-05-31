import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private _userService: UsersService, private _router: Router) {}
  canActivate(): boolean {
    if (this._userService.loggedIn()) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
