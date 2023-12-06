import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "http://localhost:3000/api/users"

  constructor(private http: HttpClient) { }

  sendEmail(obj:any){
    return this.http.post<{ msg: boolean }>(this.userURL + "/sendEmail", obj);
  }
}
