import { Component } from '@angular/core';
import {AuthService} from '../shared/auth.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  userId:any;
  userData:any;
  userRole:any
  constructor(private route :Router,private authService:AuthService){
    if(!localStorage.getItem("jwtToken")){
      route.navigate(['login'])
    }
    
    // this.userId = this.route.snapshot.paramMap.get('userId');
    this.fetchUserData();
  }
  private fetchUserData(){
    this.authService.getUserData(this.userId).subscribe(
      (userData)=>{
        this.userRole = localStorage.getItem('role')
        this.userData = userData;
      },
      (err)=>{
        console.log("Failed to Retrieve user data")
      }
    )
  }

  logout(){
    this.authService.logout()
    localStorage.removeItem('role')
    this.route.navigate(['login'])
  }
}
