import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  public data:any
  public patchdata:any
  public Uid:any
  constructor(private server:ServerService ,private router:Router, private fb: FormBuilder ,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.test= localStorage.getItem("name");
    this.addDynamicControls();

    this.patchdata = this.server.editdata()
    // this.route.queryParams.subscribe((param:any)=>{
    //   if(param['uid']){
    //     let uid =param['uid'];
    //     this.Uid = uid
    //     let params ={uid}
    //     this.server.editdata(params).subscribe(data=>{
    //       let value=data;
    //       this.dataform.patchValue(value)
    //     })
    //   }
    // })
    // this.route.queryParams.subscribe((param:any)=>{
    //   if(param['uid']){
    //     let uid = param['uid'];
    //     this.
    //   }
    // })
    
  }
  public dataform =  this.fb.group({
    date: new FormControl('',[Validators.required]),
    amount: new FormControl(parseInt(''),[Validators.required]),
    description: new FormControl(''),
    isdelete: new FormControl(false)});
  get date(){
    return this.dataform.get('date')
  }
  get amount(){
    return this.dataform.get('amount')
  }
  get description(){
    return this.dataform.get('description')
  }
  public addDynamicControls(){
    this.dataform.addControl("name", this.fb.control(this.test, [Validators.required]));
  }
  public test:any
  onsubmit() {
    this.server.addData(this.dataform.value).subscribe()
    this.router.navigate(["/home"])
  }
  onCancel(){
    this.router.navigate(["/home"])
  }
}
