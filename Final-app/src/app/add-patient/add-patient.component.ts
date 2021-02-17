import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  registerPatientData = {
    name:{
      firstname:"",
      lastname:""
    },
    gender:"",
    address:"",
    dob:"",
    city:"",
    district:"",
    maritalStatus:"",
    contactNumber:"",
    email:""
  }
  private _isLoggedInUrl = "http://localhost:4000/isLoggedIn"
  constructor(private http: HttpClient, private _router:Router, private _patients: PatientsService) { }

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

  addPatient(){
    this._patients.addPatient(this.registerPatientData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    this._router.navigate(['']);
  }
  getAllPatients(){
    this._patients.getAllPatients().subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
  getPatientByPID(pId){
    this._patients.getPatientsByPId(pId).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
