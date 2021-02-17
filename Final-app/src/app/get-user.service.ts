import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  private _getUserUrl = "http://localhost:4000/getUser"
  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<any>(this._getUserUrl)
  }
}
