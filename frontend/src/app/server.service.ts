import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iElement } from './interface/element';
import { ipatch } from './interface/patch';
// import { imonth } from './interface/month';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  public url ='http://localhost:7071/api/apiSignIn';
  private urlpost = "http://localhost:7071/api/addData";
  public urlgettable = "http://localhost:7071/api/apiBill";
  public urldelete = "http://localhost:7071/api/apiDelete";
  public urlupdate = "http://localhost:7071/api/apiUpdate";
  public urledit ="http://localhost:7071/api/apiEdit";
  public checkurl ="http://localhost:7071/api/testApi"

  constructor(private http:HttpClient) { }

  signin(signindata:any){
    return this.http.post<any>(this.url,signindata)
  }
  // getMonth():Observable<imonth>{
  //   return this.http.get<imonth>(this.urlMonth)
  // }
  getData():Observable<iElement>{
    return this.http.get<iElement>(this.url)
  }

  addData(user:any){
    return this.http.post(this.urlpost,user)
  }
  getTable(user:any){
    let headers = new Headers
    return this.http.post(this.urlgettable,user)
  }
  deleteData(user:any){
    return this.http.post(this.urldelete,user)
  }
  updatedata(user:any){
    return this.http.post(this.urlupdate,user)
  }
  editdata():Observable<ipatch>{
    return this.http.get<ipatch>(this.urledit)
  }
  checkData(user:any){
    return this.http.post(this.checkurl,user)
  }
}
