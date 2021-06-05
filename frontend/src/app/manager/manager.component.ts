import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  loginFlag:Boolean = false
  constructor(public loginservice:LoginService, private router: Router ) { }

  ngOnInit(): void {
    if(localStorage.getItem('manager') !== null){
      this.loginservice.setloginFlagVal(true)
    }
    if(localStorage.getItem('manager') === null){
      this.loginservice.setloginFlagVal(false)
    }
    this.loginFlag = this.loginservice.getloginFlagVal()
  }

  logout(){
    localStorage.clear()
    this.loginservice.setloginFlagVal(false)
    this.loginFlag = this.loginservice.getloginFlagVal()
    this.router.navigate(['/manager'])
  }

}
