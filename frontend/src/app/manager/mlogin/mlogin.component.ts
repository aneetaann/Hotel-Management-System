import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-mlogin',
  templateUrl: './mlogin.component.html',
  styleUrls: ['./mlogin.component.css']
})
export class MloginComponent implements OnInit {

  emailIdMissing:Boolean = false
  emailIdWrong:Boolean = false
  passwordMissing:Boolean = false
  PasswordWrong:Boolean = false
  isLoginFlag:Boolean = false
  loginForm = new FormGroup({
    loginEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$')]),
    loginPwd: new FormControl('',Validators.required)
  })
  signupForm = new FormGroup({
    sgEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$')]),
    sgPwd: new FormControl('',Validators.required)
  })
  constructor(private httpC: HttpClient, private router: Router, private loginservice: LoginService) { }

  ngOnInit(): void {
    if(this.loginservice.getloginFlagVal()){
      this.router.navigate(['/manager/room'])
    }
    console.log(this.isLoginFlag)
  }
  openSignUp(){
    this.isLoginFlag = true;
    this.emailIdMissing = false
    this.emailIdWrong = false
    this. passwordMissing = false
    this.PasswordWrong= false
  }
  openLogIn(){
    this.isLoginFlag = false;
    this.emailIdMissing = false
    this.emailIdWrong = false
    this. passwordMissing = false
    this.PasswordWrong= false
  }
  login(){
    console.log('hey')
    if(this.loginForm.get('loginEmail')?.errors?.required){
      this.emailIdMissing = true
    }
    if(this.loginForm.get('loginEmail')?.hasError('pattern')){
      this.emailIdWrong = true
    }
    if(this.loginForm.get('loginPwd')?.errors?.required){
      this.passwordMissing = true
    }
    if(this.passwordMissing === false && this.emailIdWrong === false && this.emailIdMissing === false){
      const bodyem = {
        "email": this.loginForm.get('loginEmail')?.value,
        "password": this.loginForm.get('loginPwd')?.value
      } 
      console.log("hii",bodyem)
      this.httpC.post<any>('http://localhost:3001/manager/login',bodyem).subscribe((x) => {
        console.log('heyy',x.message)
        switch(x.message){
          case 'Auth Successful':{
            console.log('Succesful');
            localStorage.setItem('manager',x.token)
            this.loginservice.setloginFlagVal(true)
            alert("Logged in successfully")
            this.router.navigate(['/manager/room'])
            break;
          }
          case 'Auth failed':{
            console.log('unsuccessuful');
            alert("logged in Failed")
            localStorage.clear()
            this.loginservice.setloginFlagVal(false)
            break;
          }
        }
      })
    }
  }
  signup(){
    if(this.signupForm.get('sgEmail')?.errors?.required){
      this.emailIdMissing = true
    }
    if(this.signupForm.get('sgEmail')?.hasError('pattern')){
      this.emailIdWrong = true
    }
    if(this.signupForm.get('sgPwd')?.errors?.required){
      this.passwordMissing = true
    }
    if(this.passwordMissing === false && this.emailIdWrong === false && this.emailIdMissing === false){
      const bodyem = {
        "email": this.signupForm.get('sgEmail')?.value,
        "password": this.signupForm.get('sgPwd')?.value
      } 
      console.log(bodyem)
      this.httpC.post<any>('http://localhost:3001/manager/signup',bodyem).subscribe((x) => {
        switch(x.message){
          case 'Mail already exists':{
            console.log('Unsuccessful');
            alert("Please use a different email")
            break;
          }
          case 'User created':{
            console.log('successuful');
            alert("Sucessfully signed up");
            this.openLogIn()
            break;
          }
        }
      })
    }
  }
}


