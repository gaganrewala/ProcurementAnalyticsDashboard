import { Component } from '@angular/core';
import {AuthService} from '../shared/auth.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  userId:any;
  userData:any;
  constructor(private route :ActivatedRoute,private authService:AuthService){
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.fetchUserData();
  }
  private fetchUserData(){
    this.authService.getUserData(this.userId).subscribe(
      (userData)=>{
        this.userData = userData;
      },
      (err)=>{
        console.log("Failed to Retrieve user data")
      }
    )
  }
}
