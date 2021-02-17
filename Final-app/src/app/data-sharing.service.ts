import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  PatientObjectID
  getPatientObjectID(){
    return this.PatientObjectID;
  }
  setPatientObjectID(value){
    this.PatientObjectID=value;
  }
  constructor() { }
}
