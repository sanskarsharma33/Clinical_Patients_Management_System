import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.css']
})
export class ViewCasesComponent implements OnInit {

  flag=false
  cases=[]
  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  private _AllCasesUrl = "http://localhost:4000/case/getall"
  private _DeleteCasesUrl = "http://localhost:4000/case/deletecase"
  constructor(private http:HttpClient, private _router:Router) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')==false){
      this._router.navigate(['/login'])
    }
    this.http.get<any>(this._isLoggedInUrl)
    .subscribe(
      res =>{} ,
      err =>{
        console.log(err)
        this._router.navigate(['/login'])
      }
    )
    this.http.get<any>(this._AllCasesUrl)
    .subscribe(
      res => {
        this.flag=true
        this.cases=res
        console.log(res)
      },
      err =>{
        console.log(err)
        this._router.navigate(['/login'])
      }
    )
  }

  onDelete(id){
    this.http.delete(this._DeleteCasesUrl+'/'+id).subscribe();
    this.ngOnInit();
  }

  onEdit(id){
    localStorage.setItem('caseId',id)
    this._router.navigate(['/editcase'])
  }

}
