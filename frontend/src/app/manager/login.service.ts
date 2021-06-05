import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginFlagPublic:Boolean = false
  constructor() { }
  getloginFlagVal(){
    return this.loginFlagPublic
  }
  setloginFlagVal(val: Boolean){
    this.loginFlagPublic = val
  }
  
}
