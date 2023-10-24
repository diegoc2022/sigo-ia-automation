import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public message: boolean = true;
  private URL?:string;
  private API?:string;
  constructor(private http: HttpClient) {
    this.URL='http://localhost:3001/';
    this.API = 'login/user/';
   }

   func_retorna_textos(data:any): Observable<any>{
    console.log("Msg: ",data); 
    this.message = true;       
    return this.http.post<any>(`${this.URL}${this.API}`,{
      "msg":data
    })
   }
}
