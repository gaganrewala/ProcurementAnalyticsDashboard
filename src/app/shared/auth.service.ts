import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/users';
  constructor(private http:HttpClient) { }
  login(loginData:any):Observable<any>{
    return this.http.post('http://localhost:5000/get',loginData)
  }
  register(registerData:any):Observable<any>{
    return this.http.post('http://localhost:5000/create',registerData)
  }
  
  getUserData(id:any):Observable<any>{
    return this.http.get(`http://localhost:5000/products`)
    // const url = `${this.baseUrl}/${id}`;
    // return this.http.get<any>(this.baseUrl);
  }
}
