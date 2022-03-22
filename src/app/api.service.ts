import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iusers } from './users';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUsers(userInfo:any):Observable<Iusers>{
    return this.http.post<any>("http://localhost:4000/register",{
      "first_name":userInfo.first_name,
      "last_name":userInfo.last_name,
      "email_id":userInfo.email_id,
      "gender":userInfo.gender,
      "password":userInfo.password
    });

  
  }

  updateUsers(userInfo:any){
    return this.http.put("http://localhost:4000/update/"+userInfo._id,{
      "first_name":userInfo.first_name,
      "last_name":userInfo.last_name,
      "email_id":userInfo.email_id,
      "gender":userInfo.gender,
      "password":userInfo.password
    },{responseType:"text"});

  
  }

  getUsers():Observable<Iusers>{
    return this.http.get<Iusers>('http://localhost:4000/pageload')
  }

  deleteUsers(id:any){
    return this.http.delete('http://localhost:4000/delete/'+id,{responseType: 'text'})
  }
}
