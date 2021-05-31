import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Passenger } from '../passenger';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passengerModel = new Passenger('', 0,'','','','');
  
  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  login(form:NgForm){
    console.log(form);
  }

  reserve(){
  this.router.navigate(['reservation']);
  }
}
