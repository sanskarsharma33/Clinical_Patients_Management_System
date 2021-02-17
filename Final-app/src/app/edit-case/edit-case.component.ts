import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {
  
  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  private _EditCaseUrl = "http://localhost:4000/case/editcase"
  private _GetCaseByIdUrl = "http://localhost:4000/case/getcasebyid"
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
    if(localStorage.getItem('caseId')){
      this.http.get<any>(this._GetCaseByIdUrl+'/'+localStorage.getItem('caseId')).subscribe(
        res=>{
          console.log(res)
          this.CaseDetails=res
        },
        err => {}
      )
      localStorage.removeItem('caseId')
    }
  }

  editCase(){
    // console.log(this.CaseDetails);
    this.http.put(this._EditCaseUrl,this.CaseDetails).subscribe(
      res => {
        console.log("Updated")
      },
      err => console.log(err)
    )
    this._router.navigate(['/viewcases'])
  }

}
