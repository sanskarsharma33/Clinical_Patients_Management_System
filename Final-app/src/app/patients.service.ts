import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private _registerUrl = "http://localhost:4000/patients/add"
  private _getAllPatients = "http://localhost:4000/patients/get_all"
  private _getPatientsByPID = "http://localhost:4000/patients/getbypid"
  private _getPatientsByID = "http://localhost:4000/patients/getbyid"
  private _getPatientsByDoctor = "http://localhost:4000/patients/getallbydoctor"
  private _getPatientsByCity = "http://localhost:4000/patients/getallbycity"
  private _getPatientsByFname = "http://localhost:4000/patients/getByFname"
  private _getPatientsByLname = "http://localhost:4000/patients/getByLname"
  private _UPDATEPatientURL = "http://localhost:4000/patients/update"
  constructor(private http: HttpClient) { }

  getAllPatients(){
    return this.http.get<any>(this._getAllPatients)
  }
  getPatientsByPId(pId){
    return this.http.get<any>(this._getPatientsByPID+"/"+pId)
  }
  getPatientsByName(pId){
    return this.http.get<any>(this._getPatientsByPID+"/"+pId)
  }
  getPatientsById(Id){
    return this.http.get<any>(this._getPatientsByID+"/"+Id)
  }
  getPatientsByFname(name){
    return this.http.get<any>(this._getPatientsByFname+"/"+name)
  }
  getPatientsByLname(name){
    return this.http.get<any>(this._getPatientsByLname+"/"+name)
  }
  getPatientsByDoctor(){
    return this.http.get<any>(this._getPatientsByDoctor)
  }
  getPatientsByCity(city){
    return this.http.get<any>(this._getPatientsByCity+"/"+city)
  }
  addPatient(registerPatientData){
    return this.http.post<any>(this._registerUrl, registerPatientData)
  }
  updatePatient(updatePatientData){
    // console.log("updating")
    // console.log(this._UPDATEPatientURL)
    return this.http.post<any>(this._UPDATEPatientURL, updatePatientData)
  }
}
