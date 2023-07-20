import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  login(loginData:any):Observable<any>{
  return this.http.post('https://examplenode.onrender.com/login',loginData)
  }
  register(registerData:any):Observable<any>{
    return this.http.post('https://examplenode.onrender.com/register',registerData)
  }
  getUserData(id:any):Observable<any>{
    return this.http.get(`https://examplenode.onrender.com/products`)
  }
  logout(){
    localStorage.removeItem('jwtToken')
  }
}
