import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm !: FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }


  login(){
    this.http.get<any>('http://localhost:3333/users')
    .subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.password === this.loginForm.value.password && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success !!");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not Found !!")
      }
    },err=>{
      alert("Something went wrong !!")
    })
  }
}
