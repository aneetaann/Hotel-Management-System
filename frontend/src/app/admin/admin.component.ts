import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLoggedInFlag:Boolean = false
  constructor(public loginservice: LoginService, private router: Router) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('admin') === null){
      this.loginservice.setLoginFlagVal(false)
      this.isLoggedInFlag = this.loginservice.getLoginFlagVal()
    }
    if(localStorage.getItem('admin') !== null){
      this.loginservice.setLoginFlagVal(true)
      this.isLoggedInFlag = this.loginservice.getLoginFlagVal()
    }
  }

  logout(){
    localStorage.clear()
    this.loginservice.setLoginFlagVal(false)
    this.router.navigate(['/admin'])
  }
}

