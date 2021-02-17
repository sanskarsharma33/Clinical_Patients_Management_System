import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {

  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  private _AddCaseUrl = "http://localhost:4000/case/addcase"
  CaseDetails={
    pId:"",
    caseDate:Date,
    majorDiease:"",
    note:"",
  }
  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')==false){
      this._router.navigate(['/login'])
    }
    let flag=false
    this.http.get<any>(this._isLoggedInUrl)
    .subscribe(
      res => flag=true,
      err =>{
        console.log(err)
        this._router.navigate(['/login'])
      }
    )
    if(localStorage.getItem('pId')){
      this.CaseDetails.pId=localStorage.getItem('pId')
      localStorage.removeItem('pId')
    }
  }

  addCase(){
    // console.log(this.CaseDetails);
    this.http.post(this._AddCaseUrl,this.CaseDetails).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
    this._router.navigate(['/viewcases'])
  }

}
