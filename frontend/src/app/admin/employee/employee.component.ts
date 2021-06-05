import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
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
  editForm = new FormGroup({
    jobprofile: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    age: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required)
  })
  allEmployees:Array<any>=[];
  constructor(private httpc: HttpClient, private loginservice: LoginService, private router: Router) { 
   
  }

  ngOnInit(): void {
    // this.httpc.get<Object>('http://localhost:3001/room').subscribe((x) => {
    //   this.allRooms.push(x)
    //   console.log(this.allRooms)
    //   console.log(x)
    // })
    console.log("hello")
    if(!this.loginservice.getLoginFlagVal()){
      this.router.navigate(['/admin'])
    }
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

        
  }

  changeCurrentTab(x:any){
    this.currentTab = x
  }

  editRoom(someID:any){
    console.log(someID)
    this.httpc.get<any>(`http://localhost:3001/employee/${someID}`).subscribe((x) => {
      this.currentRoom = x
      console.log(this.currentRoom)
      this.editForm.setValue({
        'jobprofile': this.currentRoom.jobprofile,
        'phone': this.currentRoom.phone,
        'age': this.currentRoom.age,
        'address': this.currentRoom.address
      })
      this.currentTab = 2
    })
    
  }

  save(){
    let obj = {
      'jobprofile': this.editForm.get('jobprofile')?.value,
      'phone': this.editForm.get('phone')?.value,
      'age': this.editForm.get('age')?.value,
      'address': this.editForm.get('address')?.value,
    }
    this.httpc.put<any>(`http://localhost:3001/employee/${this.currentRoom._id}`,obj).subscribe((x) => {
      console.log(x)
      switch(x.message){
        case 'Employee updated': {
          this.allEmployees = []
          let response:any[]=[]
          this.httpc.get<Object>('http://localhost:3001/employee').subscribe(
            (res) => {
                  console.log(res)
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
                  this.currentTab = 0
              })
          break;
        }
        case 'Employee not updated': {
          alert('Employee did not get updated')
        }
      }
    })
  }
  deleteRoom(someID: any){
    // console.log(`http://localhost:3001/room/${someID}`)
    this.httpc.delete<any>(`http://localhost:3001/employee/${someID}`).subscribe((x) =>{
      switch(x?.message){
        case 'Employee Deleted': {
          this.allEmployees = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/employee').subscribe(
                (res) => {
                      console.log(res)
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
                      this.currentTab = 0
                  })
              break;
        }
        case 'Employee Cannot be deleted':{
          alert('Employee cannot be deleted')
          break;
        }
      }
    })
  }
  addRoom(){
    const obj = {
      'name': this.roomForm.get('name')?.value,
      'jobprofile': this.roomForm.get('jobprofile')?.value,
      'email': this.roomForm.get('email')?.value,
      'phone': this.roomForm.get('phone')?.value,
      'age': this.roomForm.get('age')?.value,
      'gender': this.roomForm.get('gender')?.value,
      'address': this.roomForm.get('address')?.value,
    }
    console.log(obj)
    this.httpc.post<any>('http://localhost:3001/employee/',obj).subscribe((x) => {
      switch(x.message){
        case 'Employee Created': {
              this.allEmployees = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/employee').subscribe(
                (res) => {
                      console.log(res)
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
                      this.currentTab = 0
                  })
              break;
        }
        case 'Employee Not Created': {
          alert('Employee wasnt created')
        }
      }
    })
  }
}
