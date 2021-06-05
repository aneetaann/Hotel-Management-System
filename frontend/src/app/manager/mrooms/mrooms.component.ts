import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-mrooms',
  templateUrl: './mrooms.component.html',
  styleUrls: ['./mrooms.component.css']
})

export class MroomsComponent implements OnInit {
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
  editForm = new FormGroup({
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
      this.router.navigate(['/manager'])
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

  changeCurrentTab(x:any){
    this.currentTab = x
  }

  editRoom(someID:any){
    console.log(someID)
    this.httpc.get<any>(`http://localhost:3001/room/${someID}`).subscribe((x) => {
      this.currentRoom = x
      console.log(this.currentRoom)
      this.editForm.setValue({
        'availability': this.currentRoom.availability,
        'price': this.currentRoom.price
      })
      this.currentTab = 2
    })
    
  }

  save(){
    let obj = {
      'availability': this.editForm.get('availability')?.value,
      'price': this.editForm.get('price')?.value,
    }
    this.httpc.put<any>(`http://localhost:3001/room/${this.currentRoom._id}`,obj).subscribe((x) => {
      console.log(x)
      switch(x.message){
        case 'Room updated': {
          this.allRooms = []
          let response:any[]=[]
          this.httpc.get<Object>('http://localhost:3001/room').subscribe(
            (res) => {
                  console.log(res)
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
                  this.currentTab = 0
              })
          break;
        }
        case 'Room not updated': {
          alert('Room did not get updated')
        }
      }
    })
  }
  deleteRoom(someID: any){
    // console.log(`http://localhost:3001/room/${someID}`)
    this.httpc.delete<any>(`http://localhost:3001/room/${someID}`).subscribe((x) =>{
      switch(x?.message){
        case 'Room Deleted': {
          this.allRooms = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/room').subscribe(
                (res) => {
                      console.log(res)
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
                      this.currentTab = 0
                  })
              break;
        }
        case 'Room Cannot be deleted':{
          alert('Room cannot be deleted')
          break;
        }
      }
    })
  }
  addRoom(){
    const obj = {
      'roomnumber': this.roomForm.get('roomNo')?.value,
      'floor': this.roomForm.get('floor')?.value,
      'type': this.roomForm.get('type')?.value,
      'availability': this.roomForm.get('availability')?.value,
      'price': this.roomForm.get('price')?.value,
    }
    console.log(obj)
    this.httpc.post<any>('http://localhost:3001/room/',obj).subscribe((x) => {
      switch(x.message){
        case 'Room Created': {
              this.allRooms = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/room').subscribe(
                (res) => {
                      console.log(res)
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
                      this.currentTab = 0
                  })
              break;
        }
        case 'Room Not Created': {
          alert('room wasnt created')
        }
      }
    })
  }
}

