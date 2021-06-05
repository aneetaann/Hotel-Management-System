import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-rrooms',
  templateUrl: './rrooms.component.html',
  styleUrls: ['./rrooms.component.css']
})

export class RroomsComponent implements OnInit {
  currentTab:any = 0
  currentRoom:any = 0
  signupForm = new FormGroup({
    sgEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$')]),
    sgPwd: new FormControl('',Validators.required)
  })
  loginForm = new FormGroup({
    loginEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$')]),
    loginPwd: new FormControl('',Validators.required)
  })
  roomForm = new FormGroup({
    roomNo: new FormControl('', Validators.required),
    floor: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    availability: new FormControl('',Validators.required)
  })
  allRooms:Array<any>=[];
  constructor(private httpc: HttpClient, private router: Router, private loginservice: LoginService) { 
   
  }

  ngOnInit(): void {
    // this.httpc.get<Object>('http://localhost:3001/room').subscribe((x) => {
    //   this.allRooms.push(x)
    //   console.log(this.allRooms)
    //   console.log(x)
    // })
    if(!this.loginservice.getloginFlagVal()){
      this.router.navigate(['/receptionist'])
    }
    console.log("hello")
    let response:any[]=[]
    this.httpc.get<Object>('http://localhost:3001/room').subscribe(
      (res) => {
            console.log(res)
            // console.log(this.allRooms)
            response.push(res)
           
            let recs:any[]=response[0]
            for (let i=0;i<recs.length;i++){
              this.allRooms.push({availability: response[0][i].availability,
                floor: response[0][i].floor,
                price: response[0][i].price,
                roomnumber: response[0][i].roomnumber,    
                type: response[0][i].type,
                updatedOn:response[0][i].updatedOn,
                id: response[0][i]._id
               });   
            }
            console.log("hey",response)
        })

        
  }

}
