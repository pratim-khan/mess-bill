import { HttpClient, HttpParams } from '@angular/common/http';
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
  // public urlgettable ='http://localhost:7071/api/demoApi';
  
  private urlpost = "http://localhost:7071/api/addData";
  public urlgettable = "http://localhost:7071/api/apiBill";
  public urldelete = "http://localhost:7071/api/apiDelete";
  public urlupdate = "http://localhost:7071/api/apiUpdate";
  public urledit ="http://localhost:7071/api/apiEdit";
  public checkurl ="http://localhost:7071/api/testApi";
  public urlregister="http://localhost:7071/api/apiRegister"

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
  getTable(){
    // let headers = new Headers
    // return this.http.post(this.urlgettable,user)
    return this.http.get(this.urlgettable,
      {
      observe : 'body',
      params:new HttpParams().append('token', localStorage.getItem("token") || "{}")
    }
    )
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
  registerdata(user:any){
    return this.http.post(this.urlregister,user)
  }
}
