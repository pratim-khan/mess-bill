import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../server.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  public data:any
  public patchdata:any
  public Uid:any
  constructor(private server:ServerService ,private router:Router, private fb: FormBuilder ,private route:ActivatedRoute , private dialog:MatDialog) { }
  ngOnInit(): void {
    this.test= localStorage.getItem("name");
    this.addDynamicControls();

    this.patchdata = this.server.editdata()
    let editData:any = localStorage.getItem("editData")
    this.dataform.patchValue(JSON.parse(editData))
  }
  public dataform =  this.fb.group({
    date: new FormControl('',[Validators.required]),
    amount: new FormControl(parseInt('') ,[Validators.required]),
    description: new FormControl(''),
    isdelete: new FormControl(false),
    uid : new FormControl(0)
  })
  // public dataform =  this.fb.group({
  //   image : new FormControl('')
  // })
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
  public autheticate:any=true
  onsubmit() {
  const dialogRef = this.dialog.open(DialogComponent,{
    width:"350px",
    data:{
      message:"Are you really want to add this item ",
      confirm: false
    }
  })
  dialogRef.afterClosed().subscribe(result=>{
    if(result === true){
      this.server.addData(this.dataform.value).subscribe(
        (res:any)=>{
        this.router.navigate(['home'])
      })
      localStorage.removeItem("editData")
    }else{
      this.router.navigate(["/home"])
      localStorage.removeItem("editData")
    }
  })

}
// onsubmit(){
//   console.log(this.url)
//   this.server.addData(this.url).subscribe()
// }
  onCancel(){
    this.router.navigate(["/home"])
    localStorage.removeItem("editData")
  }
  public DATE = new Date()
  public year = this.DATE.getFullYear()
  public month = (this.DATE.getMonth() + 1).toString().padStart(2,'0')
  public Date = (this.DATE.getDate()).toString().padStart(2,'0')
  public minDate = this.year + "-" + this.month + "-" + "01"
  public maxDate = this.year + "-" + this.month + "-" + this.Date

  // public url:any = '';
  // onSelectFile(event:any) {
  //   if (event.target.files && event.target.files[0] ) {
  //     var reader = new FileReader();

  //     reader.readAsText(event.target.files[0]); 

  //     reader.onload = (event) => { 
  //       this.url = event.target?.result
  //     }
  //   }
  // }
}