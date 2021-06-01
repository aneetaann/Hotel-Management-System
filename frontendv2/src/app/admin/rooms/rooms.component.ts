import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  signupForm = new FormGroup({
    sgEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$')]),
    sgPwd: new FormControl('',Validators.required)
  })
  loginForm = new FormGroup({
    loginEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$')]),
    loginPwd: new FormControl('',Validators.required)
  })
  allRooms:Array<any>=[];
  constructor(private httpc: HttpClient) { 
   
  }

  ngOnInit(): void {
    // this.httpc.get<Object>('http://localhost:4000/room').subscribe((x) => {
    //   this.allRooms.push(x)
    //   console.log(this.allRooms)
    //   // show me how the output  in postman
    //   // do we have to restart the server?? no its running
    //   // okay can i do some changes in the server thingy...i need to try one thingyep
    //   // console.log(x)
      
    
    // })
    console.log("hello")
    let response:any[]=[]
    this.httpc.get<Object>('http://localhost:4000/room').subscribe(
      (res) => {
        
            // console.log(this.allRooms)
            response.push(res)
            let recs:any[]=response[0]
            for (let i=0;i<recs.length;i++){
              this.allRooms.push({availability: response[0][i].availability,
                floor: response[0][i].floor,
                price: response[0][i].price,
                roomnumber: response[0][i].roomnumber,
                type: response[0][i].type,
                updatedOn:response[0][i].updatedOn, });   
            }
        })

        
  }

  changeCurrentTab(x:any){
    this.currentTab = x
  }
  
}
