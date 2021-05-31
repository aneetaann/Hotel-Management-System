import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  

  // reservationModel = new Reservation(' ',' ','','',1,YYYY-MM-DD);
 
  constructor() { }

  ngOnInit(): void {
  }

}
