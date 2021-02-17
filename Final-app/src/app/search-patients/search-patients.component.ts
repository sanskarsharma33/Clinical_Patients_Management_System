import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientsService } from '../patients.service';
import { DataSharingService } from '../data-sharing.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-patients',
  templateUrl: './search-patients.component.html',
  styleUrls: ['./search-patients.component.css']
})
export class SearchPatientsComponent implements OnInit {

  patients = []
  flag=false
  patientparameter
  option=0
  Type="Patient ID"
  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  constructor(private http:HttpClient, private _patient: PatientsService, private _data: DataSharingService, private _router:Router) { }

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
  }

  async onSubmit(){
    localStorage.removeItem("patient")
    this.flag=false
    if(this.option==0){
      await this._patient.getPatientsByPId(this.patientparameter).subscribe(
        res => {
          this.patients=res
          if(res.length!=0){
            this.flag=true
          } 
        },
        err => {
          console.log(err)
          this.flag=false
        }
      )
    }
    else if(this.option==1){
      await this._patient.getPatientsByFname(this.patientparameter).subscribe(
        res => {
          this.patients=res
          if(res.length!=0){
            this.flag=true
          } 
        },
        err => {
          console.log(err)
          this.flag=false
        }
      )
    }
    else if(this.option==2){
      await this._patient.getPatientsByLname(this.patientparameter).subscribe(
        res => {
          this.patients=res
          if(res.length!=0){
            this.flag=true
          } 
        },
        err => {
          console.log(err)
          this.flag=false
        }
      )
    }
    else if(this.option==4){
      await this._patient.getPatientsByCity(this.patientparameter).subscribe(
        res => {
          this.patients=res
          if(res.length!=0){
            this.flag=true
          } 
        },
        err => {
          console.log(err)
          this.flag=false
        }
      ) 
    }
  
  }

  async setType(value){
    this.option=value;
    if(this.option==0){
      this.Type="PID"
    }
    else if(this.option==1){
      this.Type="Firstname"
    }
    else if(this.option==2){
      this.Type="Lastname"
    }
    else if(this.option==3){
      this.Type="All"
      await this._patient.getPatientsByDoctor().subscribe(
        res => {
          this.patients=res;
          if(res.length!=0){
            this.flag=true
          } 
          console.log(res);
        },
        err => {
          console.log(err)
          this.flag=false
        }
      )
      console.log(this.patients)
    }
    else{
      this.Type="City"
    }
  }
  onUpdateOption(value){
    this._data.setPatientObjectID(value)
    localStorage.setItem("patient", this._data.getPatientObjectID())
    this._router.navigate(['/profile'])
  }
}
