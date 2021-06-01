import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators'
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  currentTab:any = 0
  // allRooms:Array<Object> = [
  //   {
  //     "rooms": 1,
  //     "cost": 500
  //   },
  //   {
  //     "rooms": 1,
  //     "cost": 500
  //   }
  // ]
  allRooms:Array<Object> = [];
  constructor(private httpc: HttpClient) { }

  ngOnInit(): void {
    // this.httpc.get<Object>('http://localhost:4000/room').subscribe((x) => {
    //   this.allRooms.push(x)
    //   console.log(this.allRooms)
    //   // show me how the output  in postman
    //   // do we have to restart the server?? no its running
    //   // okay can i do some changes in the server thingy...i need to try one thingyep
    //   // console.log(x)
      

    // })
    this.httpc.get<Object>('http://localhost:4000/room').subscribe({
      next: data => {
        console.log(data)
      }
    })
  }

  changeCurrentTab(x:any){
    this.currentTab = x
  }

}
