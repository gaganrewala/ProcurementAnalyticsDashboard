import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../shared/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm !: FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router){
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  onSubmit(){
    const {email,password} = this.loginForm.value
    this.authService.login().subscribe(
      (response)=>{
        const user = response.find((a:any)=>a.email===email && a.password===password);
        if(user){
          alert("Login Success !!")
          this.loginForm.reset()
          // this.router.navigate(['dashboard',user.id])
          this.router.navigate(['dashboard'])
        }else{
          alert("User not Found !!")
        }
      },error=>{
        console.log("Something Wrong !!")
      }
    );
  }
}
