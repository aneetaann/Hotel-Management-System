//we create Angular Service for consuming REST API using Angular HttpClient
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/*angular router is use to present a particular 
component view - refer logoutUser() present at the last*/
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _registerUrl = 'http://localhost:3000/api/register'; //endpoint api for register
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private _router: Router) {}
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }
  /*the loginUser accepct the user object which is email and password & returns
  the response from the backebd api sends whenever it is available*/
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }
  /*this method is used to chk whether user is valid or not -- for route gaurd */
  loggedIn() {
    return !!localStorage.getItem('token'); //it will return true false whether token exits in browser or not
  }

  //logout method
  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/']); //we have used router to present home component after the user is logout
  }

  /*method that fetches the token value*/
  getToken() {
    return localStorage.getItem('token');
  }
}
