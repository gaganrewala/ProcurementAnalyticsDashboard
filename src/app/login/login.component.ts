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
    if(localStorage.getItem("jwtToken")){
      router.navigate(['dashboard'])
    }
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  onSubmit(){
    const loginuser = this.loginForm.value
    this.authService.login(loginuser).subscribe(
      (response)=>{
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['dashboard'])
      },error=>{
        console.log("Something Wrong !!")
      }
    );
  }
}
