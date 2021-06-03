import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private httpC: HttpClient, private router: Router) { }

  ngOnInit(): void {
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
      console.log(bodyem)
      this.httpC.post<any>('http://localhost:3001/manager/login',bodyem).subscribe((x) => {
        switch(x.message){
          case 'Auth Successful':{
            console.log('Succesful');
            alert("Logged in successfully")
            this.router.navigate(['/manager/room'])
            break;
          }
          case 'Auth Failed':{
            console.log('unsuccessuful');
            alert("logged in Failed")
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
        "email": this.loginForm.get('loginEmail')?.value,
        "password": this.loginForm.get('loginPwd')?.value
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
            alert("Sucessfully signed up")
            break;
          }
        }
      })
    }
  }
}


