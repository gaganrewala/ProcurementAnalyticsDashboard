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
      password:[''],
      moile:['']
    })
  }
  register(){
    alert("register working")
    console.log(this.registerForm.value)
  }
}
