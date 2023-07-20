import { Component } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../shared/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm !: FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router){
    if(localStorage.getItem("jwtToken")){
      router.navigate(['dashboard'])
    }
    this.registerForm = this.formBuilder.group({
      email:[''],
      password:[''],
      roleId:[''],
    })
  }
  
  onSubmit(){
    const userData = this.registerForm.value
    this.authService.register(userData).subscribe(response=>{
      alert("Register Successfull")
      this.registerForm.reset()
      this.router.navigate(['login'])
    },err=>{
      alert("Something Went Wrong !!")
    })
  }
}
