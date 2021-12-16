import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthGuardService } from '../auth-guard.service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  googleDetails: any;

  get phone() {
    return this.registrationform.get('phone')
  }
  get name() {
    return this.registrationform.get('name')
  }
  get password() {
    return this.registrationform.get('phone')
  }
  constructor( private server:ServerService , private router:Router , private socialAuthService:SocialAuthService) { }
  public socialuser:any
  ngOnInit(): void {
  }
  registrationform = new FormGroup({
    name:new FormControl('',[Validators.required]),
    phone:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required]),
    googleUser:new FormControl(false)
  })
  public text :any
  async onsubmit(){
    let res:any= await this.server.registerdata(this.registrationform.value).toPromise();
     this.text = res["text"]
    alert(this.text)
    this.router.navigate(["signin"])
  }
 async googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{
      this.googleDetails = this.socialAuthService["_user"]
      let res:any=this.server.registerdata(this.googleDetails).toPromise();
      this.router.navigate(['signin'])
    }
    
    )
   
  }
}
