import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  login(loginData:any):Observable<any>{
  return this.http.post(`https://examplenode.onrender.com/user/login`,loginData)
  }
  register(registerData:any):Observable<any>{
    return this.http.post('https://examplenode.onrender.com/user/register',registerData)
  }
  getUserData(id:any):Observable<any>{
    return this.http.get(`https://examplenode.onrender.com/api/products`)
  }
  logout(){
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('role')
  }
  updateUserData(updatedUser: any): Observable<any> {
    const userId = updatedUser.id;
    return this.http.put<any>(`https://examplenode.onrender.com/api/products/${userId}`, updatedUser);
  }
  deleteUserData(userId: string): Observable<any> {
    return this.http.delete<any>(`https://examplenode.onrender.com/api/products/${userId}`);
  }
  createUser(user: any): Observable<any> {
    return this.http.post<any>('https://examplenode.onrender.com/api/products', user);
  }
  getUser(userId:any): Observable<any> {
    const url = `https://examplenode.onrender.com/api/products/${userId}`;
    return this.http.get<any>(url);
  }
}
