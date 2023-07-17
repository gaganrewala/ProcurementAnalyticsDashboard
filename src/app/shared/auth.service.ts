import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/user';
  constructor(private http:HttpClient) { }
  login():Observable<any>{
    return this.http.get('http://localhost:3333/users')
  }
  register(registerData:any):Observable<any>{
    return this.http.post('http://localhost:3333/users',registerData)
  }
  
  getUserData(id:any):Observable<any>{
    // return this.http.get(`http://localhost:8080/data/${data}`)
    // const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(this.baseUrl);
  }
}
