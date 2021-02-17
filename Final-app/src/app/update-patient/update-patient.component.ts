import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { PatientsService } from '../patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

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
    email:""
  }
  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  constructor(private _router:Router, private _data: DataSharingService,private patient:PatientsService, private http:HttpClient) { }

  ngOnInit(): void {  

    //To Authenticate User

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

    //Retrive Data from API
    
    console.log(typeof this._data.getPatientObjectID() === "undefined")
    if(localStorage.getItem("patient") == "undefined")
    {
       this._router.navigate(['/search'])
    }
    else{
      this.patient.getPatientsById(localStorage.getItem("patient"))
      .subscribe(
        res=>{ 
          this.patientDetails=res
          // this.patientDetails.dob.setDate(res.dob)
          console.log(this.patientDetails.dob)
          // OId=res._id
        },
        err=> console.log(err)
      )
    }
    // console.log(this.patientDetails)
  }
  onUpdate(){
    console.log(this.patientDetails)
    this.patient.updatePatient(this.patientDetails).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    localStorage.removeItem("patient")
    this._router.navigate(['/search'])
  }

}
