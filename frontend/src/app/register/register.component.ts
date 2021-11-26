import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get phone() {
    return this.registrationform.get('phone')
  }
  get name() {
    return this.registrationform.get('name')
  }
  get password() {
    return this.registrationform.get('phone')
  }
  constructor( private server:ServerService , private router:Router) { }

  ngOnInit(): void {
  }
  registrationform = new FormGroup({
    name:new FormControl('',[Validators.required]),
    phone:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required]),
    authenticate:new FormControl("true")
  })
  public text :any
  async onsubmit(){
    let res:any= await this.server.registerdata(this.registrationform.value).toPromise();
     this.text = res["text"]
    alert(this.text)
    this.router.navigate(["signin"])
  }
}
