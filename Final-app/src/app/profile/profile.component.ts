import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { PatientsService } from '../patients.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  patientDetails={
    _id:"",
    name:{
      firstname:"",
      lastname:""
    },
    gender:"",
    address:"",
    dob:new Date(),
    city:"",
    district:"",
    maritalStatus:"",
    contactNumber:"",
    email:"",
    pId:""
  }
  month=new Date().getMonth()
  date=new Date().getDate()
  year=new Date().getFullYear()
  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  constructor(private _router:Router, private _data: DataSharingService,private patient:PatientsService, private http:HttpClient) { }

  ngOnInit(): void {  
    // console.log(typeof this._data.getPatientObjectID() === "undefined")
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
    if(typeof localStorage.getItem("patient") === "undefined")
    {
       this._router.navigate(['/search'])
    }
    else{
      this.patient.getPatientsById(localStorage.getItem("patient"))
      .subscribe(
        res=>{ 
          this.patientDetails=res
          // this.patientDetails.dob.setDate(res.dob)
          this.month=this.patientDetails.dob.getMonth()
          this.date=this.patientDetails.dob.getDate()
          this.year=this.patientDetails.dob.getFullYear()
          console.log(this.month)
          console.log(res)
          // OId=res._id
        },
        err=> console.log(err)
      )
    }
    
  }
  onEditOption(){
    this._router.navigate(['/updatePatient'])
  }

  onAddCase(){
    localStorage.setItem('pId',this.patientDetails.pId);
    this._router.navigate(['/newCase'])
  }
}
