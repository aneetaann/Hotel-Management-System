import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-mployee',
  templateUrl: './mployee.component.html',
  styleUrls: ['./mployee.component.css']
})
export class MployeeComponent implements OnInit {
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
    jobprofile: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    age: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required)
  })
  allEmployees:Array<any>=[];
  constructor(private httpc: HttpClient, private router:Router, private loginservice: LoginService) { 
   
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
    this.httpc.get<Object>('http://localhost:3001/employee').subscribe(
      (res) => {
            console.log(res)
            // console.log(this.allRooms)
            response.push(res)
           
            let recs:any[]=response[0]
            for (let i=0;i<recs.length;i++){
              this.allEmployees.push({
                name: response[0][i].name,
                jobprofile: response[0][i].jobprofile,
                email: response[0][i].email,
                phone: response[0][i].phone,    
                age: response[0][i].age,
                gender: response[0][i].gender,
                address: response[0][i].address,
                updatedOn:response[0][i].updatedOn,
                id: response[0][i]._id
               });   
            }
            console.log("hey",response)
        })

        
  }}