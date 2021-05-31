import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from './passenger';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
 
  // passengerModel = new Passenger(' ', 0 ,' ',' ',' ',' ');
}
