import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // postUserData(data:any){
  //   return this.http.post<any>('http://localhost:3333/posts',data)
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }
}
