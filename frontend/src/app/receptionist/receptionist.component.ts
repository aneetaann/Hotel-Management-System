import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {

  constructor(public loginservice:LoginService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('receptionist') !== null){
      this.loginservice.setloginFlagVal(true)
    }
    if(localStorage.getItem('receptionist') === null){
      this.loginservice.setloginFlagVal(false)
    }
  }

  logout(){
    localStorage.clear()
    this.loginservice.setloginFlagVal(false)
    this.router.navigate(['/receptionist'])
  }
}
