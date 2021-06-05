import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedInFlagPublic:Boolean = false
  constructor() { }
  getLoginFlagVal(){
    return this.isLoggedInFlagPublic
  }
  setLoginFlagVal(val:Boolean){
    this.isLoggedInFlagPublic = val
  }
}
