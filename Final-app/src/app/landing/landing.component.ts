import { Component, OnInit } from '@angular/core';
import { GetUserService } from '../get-user.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  users=[]
  constructor(private _getUserService: GetUserService) { }

  ngOnInit(): void {
    
  }
  
}
