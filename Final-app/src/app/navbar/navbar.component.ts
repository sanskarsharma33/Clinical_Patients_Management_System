import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  flag=true
  constructor(public _authService: AuthService, public _router:Router, public http:HttpClient) { }

  ngOnInit(): void {
    // let flag=true
    if(!!localStorage.getItem('token')==false){
      this._router.navigate(['/login'])
    }
    this.http.get<any>(this._isLoggedInUrl)
    .subscribe(
      res => {
        this.flag=false
        console.log(this.flag)
      },
      err =>{
        console.log(err)
        this._router.navigate(['/login'])
      }
    )
  }

}
