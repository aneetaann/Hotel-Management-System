import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rbooking',
  templateUrl: './rbooking.component.html',
  styleUrls: ['./rbooking.component.css']
})
export class RbookingComponent implements OnInit {

  currentTab:any = 0
  panelOpenState:boolean = false;
   month:any
   year:any
   date: any;
  currentBooking:any = 0
  roomForm:FormGroup;
  editForm:FormGroup;
  
  allBookings:Array<any>=[];
  constructor(private httpc: HttpClient) { 
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.date = today.getDate();
    console.log("heyyy",today)
    this.roomForm = new FormGroup({
      guestname: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      age: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      room: new FormControl('',Validators.required),
      checkin: new FormControl(new Date(this.year, this.month, this.date),Validators.required),
      checkout: new FormControl(new Date(this.year, this.month, this.date),Validators.required),
      paymentmode: new FormControl('',Validators.required),
      totalamount: new FormControl('',Validators.required),
      phoneNo: new FormControl('',Validators.required)
     })
     this.editForm = new FormGroup({
      checkin: new FormControl(new Date(this.year, this.month, this.date),Validators.required),
      checkout: new FormControl(new Date(this.year, this.month, this.date),Validators.required),
      totalamount: new FormControl('',Validators.required),
      room: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    // this.httpc.get<Object>('http://localhost:3001/room').subscribe((x) => {
    //   this.allBookings.push(x)
    //   console.log(this.allBookings)
    //   console.log(x)
    // })
    console.log("hello")
    let response:any[]=[]
    this.httpc.get<Object>('http://localhost:3001/booking').subscribe(
      (res) => {
            console.log(res)
            // console.log(this.allBookings)
            response.push(res)
            let chkindtArr = []
            let chkoutArr = []
            let checkindate = ''
            let checkoutdate = ''
           console.log(checkindate,'to',checkoutdate)
            let recs:any[]=response[0]
            for (let i=0;i<recs.length;i++){
              chkindtArr = response[0][i].checkin.split('T')[0].split('-')
              chkoutArr = response[0][i].checkout.split('T')[0].split('-')
              checkindate = chkindtArr[2]+'-'+chkindtArr[1]+'-'+chkindtArr[0]
              checkoutdate = chkoutArr[2]+'-'+chkoutArr[1]+'-'+chkoutArr[0]
              this.allBookings.push({guestname: response[0][i].guestname,
                email: response[0][i].email,
                age: response[0][i].age,
                gender: response[0][i].gender,    
                room: response[0][i].room,
                checkin:checkindate,
                checkout:checkoutdate,
                paymentmode:response[0][i].paymentmode,
                totalamount:response[0][i].totalamount,
                phone:response[0][i].phone,
                address:response[0][i].address,
                id: response[0][i]._id
               }); 
              chkindtArr = []
              chkoutArr = []
              checkindate = ''
              checkoutdate = ''
              console.log("hey",response)  
            }
            
        })

        
  }

  changeCurrentTab(x:any){
    this.currentTab = x
  }

  editRoom(someID:any){
    console.log(someID)
    this.httpc.get<any>(`http://localhost:3001/booking/${someID}`).subscribe((x) => {
      console.log(x)
      this.currentBooking = x    
      let chkindtArr = x.checkin.split('T')[0].split('-')
      let chkoutArr = x.checkout.split('T')[0].split('-')
      let checkindate = chkindtArr[2]+'-'+chkindtArr[1]+'-'+chkindtArr[0]
      let checkoutdate = chkoutArr[2]+'-'+chkoutArr[1]+'-'+chkoutArr[0]
        console.log('checkindate',checkoutdate)
      this.editForm.setValue({
        'checkin':checkindate,
        'checkout':checkoutdate,
        'totalamount': x.totalamount,
        'room': x.room
      })
      this.currentTab = 2
    })
    
  }

  save(){
    console.log("came here")
    let date1 = this.editForm.get('checkin')?.value.toString().split(' ')
    let date2 = this.editForm.get('checkout')?.value.toString().split(' ')
    let checkin = date1[3]+'-'+date1[1]+'-'+date1[2]
    let checkout = date2[3]+'-'+date2[1]+'-'+date2[2]
    let obj = {
      'totalamount': this.editForm.get('totalamount')?.value,
      'room': this.editForm.get('room')?.value,
      'checkin':checkin,
      'checkout': checkout,
    }
    console.log("came here",obj)
    this.httpc.put<any>(`http://localhost:3001/booking/${this.currentBooking._id}`,obj).subscribe((x) => {
      console.log("Hiii",x)
      switch(x.message){
        case 'Booking updated': {
          console.log('hey')
          this.allBookings = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/booking').subscribe(
                (res) => {
                      console.log(res)
                      response.push(res)
                      let chkindtArr = []
                      let chkoutArr = []
                      let checkindate = ''
                      let checkoutdate = ''
                    console.log(checkindate,'to',checkoutdate)
                      let recs:any[]=response[0]
                      for (let i=0;i<recs.length;i++){
                        chkindtArr = response[0][i].checkin.split('T')[0].split('-')
                        chkoutArr = response[0][i].checkout.split('T')[0].split('-')
                        checkindate = chkindtArr[2]+'-'+chkindtArr[1]+'-'+chkindtArr[0]
                        checkoutdate = chkoutArr[2]+'-'+chkoutArr[1]+'-'+chkoutArr[0]
                        this.allBookings.push({guestname: response[0][i].guestname,
                          email: response[0][i].email,
                          age: response[0][i].age,
                          gender: response[0][i].gender,    
                          room: response[0][i].room,
                          checkin:checkindate,
                          checkout:checkoutdate,
                          paymentmode:response[0][i].paymentmode,
                          totalamount:response[0][i].totalamount,
                          phone:response[0][i].phone,
                          address:response[0][i].address,
                          id: response[0][i]._id
                        }); 
                        chkindtArr = []
                        chkoutArr = []
                        checkindate = ''
                        checkoutdate = ''
                        console.log("hey",response)  
                      }
                      this.currentTab = 0
                  })
              break;
        }
        case 'Booking Cannot be updated':{
          alert('Booking cannot be updated')
          break;
        }
      }
    })
  }
  deleteRoom(someID: any){
    // console.log(`http://localhost:3001/room/${someID}`)
    this.httpc.delete<any>(`http://localhost:3001/booking/${someID}`).subscribe((x) =>{
      switch(x?.message){
        case 'Booking Deleted': {
          console.log('hey')
          this.allBookings = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/booking').subscribe(
                (res) => {
                      console.log(res)
                      response.push(res)
                      let chkindtArr = []
                      let chkoutArr = []
                      let checkindate = ''
                      let checkoutdate = ''
                    console.log(checkindate,'to',checkoutdate)
                      let recs:any[]=response[0]
                      for (let i=0;i<recs.length;i++){
                        chkindtArr = response[0][i].checkin.split('T')[0].split('-')
                        chkoutArr = response[0][i].checkout.split('T')[0].split('-')
                        checkindate = chkindtArr[2]+'-'+chkindtArr[1]+'-'+chkindtArr[0]
                        checkoutdate = chkoutArr[2]+'-'+chkoutArr[1]+'-'+chkoutArr[0]
                        this.allBookings.push({guestname: response[0][i].guestname,
                          email: response[0][i].email,
                          age: response[0][i].age,
                          gender: response[0][i].gender,    
                          room: response[0][i].room,
                          checkin:checkindate,
                          checkout:checkoutdate,
                          paymentmode:response[0][i].paymentmode,
                          totalamount:response[0][i].totalamount,
                          phone:response[0][i].phone,
                          address:response[0][i].address,
                          id: response[0][i]._id
                        }); 
                        chkindtArr = []
                        chkoutArr = []
                        checkindate = ''
                        checkoutdate = ''
                        console.log("hey",response)  
                      }
                      this.currentTab = 0
                  })
              break;
        }
        case 'Booking Cannot be deleted':{
          alert('Booking cannot be deleted')
          break;
        }
      }
    })
  }
  addRoom(){
    let date1 = this.roomForm.get('checkin')?.value.toString().split(' ')
    let date2 = this.roomForm.get('checkout')?.value.toString().split(' ')
    let checkin = date1[3]+'-'+date1[1]+'-'+date1[2]
    let checkout = date2[3]+'-'+date2[1]+'-'+date2[2]
    console.log("da",checkin)
    const obj = {
      'guestname': this.roomForm.get('guestname')?.value,
      'email': this.roomForm.get('email')?.value,
      'age': this.roomForm.get('age')?.value,
      'gender': this.roomForm.get('gender')?.value,
      'address': this.roomForm.get('address')?.value,
      'room': this.roomForm.get('room')?.value,
      'paymentmode': this.roomForm.get('paymentmode')?.value,
      'totalamount': this.roomForm.get('totalamount')?.value, 
      'phone': this.roomForm.get('phoneNo')?.value,
      'checkin':checkin,
      'checkout': checkout,
    }
    console.log(obj)
    this.httpc.post<any>('http://localhost:3001/booking',obj).subscribe((x) => {
      switch(x.message){
        case 'Booking done': {
              this.allBookings = []
              let response:any[]=[]
              this.httpc.get<Object>('http://localhost:3001/booking').subscribe(
                (res) => {
                  response.push(res)
                  let chkindtArr = []
                  let chkoutArr = []
                  let checkindate = ''
                  let checkoutdate = ''
                 console.log(checkindate,'to',checkoutdate)
                  let recs:any[]=response[0]
                  for (let i=0;i<recs.length;i++){
                    chkindtArr = response[0][i].checkin.split('T')[0].split('-')
                    chkoutArr = response[0][i].checkout.split('T')[0].split('-')
                    checkindate = chkindtArr[2]+'-'+chkindtArr[1]+'-'+chkindtArr[0]
                    checkoutdate = chkoutArr[2]+'-'+chkoutArr[1]+'-'+chkoutArr[0]
                    this.allBookings.push({guestname: response[0][i].guestname,
                      email: response[0][i].email,
                      age: response[0][i].age,
                      gender: response[0][i].gender,    
                      room: response[0][i].room,
                      checkin:checkindate,
                      checkout:checkoutdate,
                      paymentmode:response[0][i].paymentmode,
                      totalamount:response[0][i].totalamount,
                      phone:response[0][i].phone,
                      address:response[0][i].address,
                      id: response[0][i]._id
                     }); 
                    chkindtArr = []
                    chkoutArr = []
                    checkindate = ''
                    checkoutdate = ''
                    console.log("hey",response)  
                  }
                      this.currentTab = 0
                  })
              break;
        }
        case 'Booking Not done': {
          alert('booking wasnt created')
        }
      }
    })
  }

}