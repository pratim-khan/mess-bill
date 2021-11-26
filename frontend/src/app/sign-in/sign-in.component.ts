
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  get phone() {
    return this.signinform.get('phone')
  }
  get password() {
    return this.signinform.get('phone')
  }

  constructor(private server:ServerService , private router:Router ,private _snackBar: MatSnackBar) { }

  signinform = new FormGroup({
    phone:new FormControl("1234567890",[Validators.required]),
    password:new FormControl("abcd@1234",[Validators.required]),
    authenticate:new FormControl("true")
  })
  public text:any
  public name:any
  public data:any

  ngOnInit(): void {
  }
  public getdata:any
  public token:any
  
  async onSubmit(){
    let res:any = await this.server.signin(this.signinform.value).toPromise();
    this.text = res["text"]
    this.name = res["name"]
    this.token = res["token"]
    console.log(this.token.toString())
    console.log(this.name)
    localStorage.setItem("token",this.token.toString())
     if(this.text==='You are successfully signed in'){
       this._snackBar.open(this.text,'OK');

      this.router.navigate(["home"]);
      
     }
     else{
       alert(this.text)
     }
     if(!localStorage.getItem('initData')){
      localStorage.setItem("name",this.name)
     }
     
     console.log(localStorage.getItem(this.name));
     
  }
  @Output() newDataEmit= new EventEmitter<string>();
  addnewitem(){
    this.newDataEmit.emit(this.name)
  }
}
