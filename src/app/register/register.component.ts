import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm !: FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit():void{
    this.registerForm = this.formBuilder.group({
      fullname:[''],
      email:[''],
      moile:[''],
      password:['']
    })
  }
  register(){
    this.http.post<any>('http://localhost:3333/users',this.registerForm.value)
    .subscribe(res=>{
      alert("Register Successfull")
      this.registerForm.reset()
      this.router.navigate(['login'])
    },err=>{
      alert("Something Went Wrong !!")
    })
  }
}
