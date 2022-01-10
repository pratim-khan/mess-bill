
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Output, EventEmitter } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';


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


  constructor(private server:ServerService , private router:Router ,private _snackBar: MatSnackBar,public socialAuthService:SocialAuthService) { }
  public visible:any = "visibility"
  onvisible(){
    var x:any = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      this.visible = "visibility_off"
    } else {
      x.type = "password";
      this.visible = "visibility"
    }
  }

  signinform = new FormGroup({
    phone:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required]),
    googleUser:new FormControl(false)
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
         
    if(!localStorage.getItem('initData')){
      localStorage.setItem("name",this.name)
     }

    localStorage.setItem("token",this.token)
     if(this.text==='You are successfully signed in'){
       this._snackBar.open(this.text,'OK');

      this.router.navigate(['home']);
      
     }else{
       alert(this.text)
     }  
  }
  @Output() newDataEmit= new EventEmitter<string>();
  addnewitem(){
    this.newDataEmit.emit(this.name)
  }
  public googleDetails :any
  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async()=>{
      this.googleDetails = this.socialAuthService["_user"]
      let res:any= await this.server.signin(this.googleDetails).toPromise();
      this.text = res.text
      this.name = res.name
      this.token = res.token
      localStorage.setItem("token",this.token)
      if(this.text==='You are successfully signed in'){
        this._snackBar.open(this.text,'OK');
        this.router.navigate(['home'])
      }
      else{
        alert(this.text)
      }
      if(!localStorage.getItem('initData')){
        localStorage.setItem("name",this.name)
       }
    }
   
    )  
  }
    
}
