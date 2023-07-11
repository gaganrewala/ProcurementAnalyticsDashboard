import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  login():Observable<any>{
    return this.http.get('http://localhost:3333/users')
  }
  register(registerData:any):Observable<any>{
    return this.http.post('http://localhost:3333/users',registerData)
  }
  
  getUserData(data:any):Observable<any>{
    return this.http.get(`http://localhost:3333/users/${data}`)
  }
}
