import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerUserData = {
    username:"",
    email:"",
    password:""
  } 

  loginUserData = {
    email:"", 
    password:""
  } 

  repass=""
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  
  registerUser(){
    if(this.repass != this.registerUserData.password){
      alert("Password Must be Same!!")
      return
    }
    this._auth.registerUser(this.registerUserData).subscribe( 
      res => {
        localStorage.setItem('token',res.token);
        this._router.navigate(['/'])
      },
      err =>{
        alert(err.error.msg)
      }
    )    
  }

  loginUser(){
    this._auth.loginUser(this.registerUserData).subscribe( 
      res => {
        localStorage.setItem('token',res.token)
        this._router.navigate(['/'])
      },
      err => {
        alert(err.error.message)
      }
    )    
  }
}
