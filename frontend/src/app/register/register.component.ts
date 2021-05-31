import { Component, OnInit } from '@angular/core';
import { Passenger } from '../passenger';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passengerModel = new Passenger('', 0,'','','','');
  constructor() { }

  ngOnInit(): void {
  }
 onSubmit(){
   console.log(this.passengerModel);
 }
}
