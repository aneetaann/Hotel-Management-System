import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router:Router,private _http:HttpClient) { }
 register(passenger:any){
   return this._http.post('/register',passenger);
 }
 logout(passenger:any){
   localStorage.clear();
   this._router.navigate(['/login']);
 }
 isAuthenticated(){
   return localStorage.getItem('passenger')
 }
}
