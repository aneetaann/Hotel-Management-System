import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-rdashboard',
  templateUrl: './rdashboard.component.html',
  styleUrls: ['./rdashboard.component.css']
})
export class RdashboardComponent implements OnInit {
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
    name: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required)
    //username: new FormControl('',Validators.required),
    //password: new FormControl('',Validators.required),
    //phone: new FormControl('',Validators.required)
  })
  editForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
    //name: new FormControl('', Validators.required),
    //username: new FormControl('',Validators.required),
    //phone: new FormControl('',Validators.required)
  })
  allEmployees:Array<any>=[];
  constructor(private httpc: HttpClient, private loginservice: LoginService, private router: Router) { }

  ngOnInit(): void {
    console.log("hello")
    if(!this.loginservice.getloginFlagVal()){
      this.router.navigate(['/receptionist'])
    }
    let response:any[]=[]
    
    this.httpc.get<Object>(`http://localhost:3000/receptionist/profile`).subscribe(
      (res) => {
            console.log(res)
            // console.log(this.allRooms)
            response.push(res)
           
            let recs:any[]=response[0]
            for (let i=0;i<recs.length;i++){
              this.allEmployees.push({
                name: response[0][i].name,
                email: response[0][i].email,
                //username: response[0][i].username,
                //password: response[0][i].password,
                //phone: response[0][i].phone,
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
    this.httpc.get<any>(`http://localhost:3000/receptionist/profile/${someID}`).subscribe((x) => {
      this.currentRoom = x
      console.log(this.currentRoom)
      this.editForm.setValue({
        'email': this.currentRoom.email,
        'password': this.currentRoom.password
        //'name': this.currentRoom.name,
        //'username': this.currentRoom.username,
        //'phone': this.currentRoom.phone
      })
      this.currentTab = 2
    })  
  }

  save(){
    let obj = {
      'email': this.editForm.get('email')?.value,
      'password': this.editForm.get('password')?.value
      //'name': this.editForm.get('name')?.value,
      //'username': this.editForm.get('username')?.value,
      //'phone': this.editForm.get('phone')?.value
    }
    this.httpc.put<any>(`http://localhost:3000/receptionist/profile/${this.currentRoom._id}`,obj).subscribe((x) => {
      console.log(x)
      switch(x.message){
        case 'Profile updated': {
          this.allEmployees = []
          let response:any[]=[]
          this.httpc.get<Object>('http://localhost:3000/receptionist/profile').subscribe(
            (res) => {
                  console.log(res)
                  response.push(res)
                
                  let recs:any[]=response[0]
                  for (let i=0;i<recs.length;i++){
                    this.allEmployees.push({
                      name: response[0][i].name,
                      email: response[0][i].email,
                      //username: response[0][i].username,
                      //password: response[0][i].password,
                      //phone: response[0][i].phone,
                      updatedOn:response[0][i].updatedOn,
                      id: response[0][i]._id
                    });   
                  }
                  console.log("hey",response)
                  this.currentTab = 0
              })
          break;
        }
        case 'Profile not updated': {
          alert('Profile did not get updated')
        }
      }
    })
  }
}
