import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL?:string;
  private API?:string
  constructor(private http: HttpClient) {
    this.URL='http://localhost:3001/';
    this.API = 'login/user/';
   }

  getLogin(user:any, passw:any): Observable<LoginData>{
    return this.http.post<LoginData>(`${this.URL}${this.API}`,{
      "nombre":user,
      "clave":passw
    });
   
   }
}
