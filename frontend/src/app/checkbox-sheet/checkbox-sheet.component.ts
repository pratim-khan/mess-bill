
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ServerService } from '../server.service';
import { User, UserSchema } from './user';

@Component({
  selector: 'app-checkbox-sheet',
  templateUrl: './checkbox-sheet.component.html',
  styleUrls: ['./checkbox-sheet.component.css']
})
export class CheckboxSheetComponent implements OnInit {
  public test = localStorage.getItem("name")
  constructor(private server:ServerService , private fb:FormBuilder ,private router:Router, private dialog:MatDialog) { }
 async ngOnInit(){
    let res:any= await this.server.checkGetData().toPromise()
    this.dataSource.data = res
    console.log(((Object.keys(this.dataSource.data).length)+1))
  }
  displayedColumns: string[] = Object.keys(UserSchema);
  dataSchema = UserSchema;
  dataSource = new MatTableDataSource<User>();
  // addRow(){
  //   let length:any= Object.keys(this.dataSource).length
  //   if(length != 30){
  //   this.dataSource.push({"date":length+1,"Chinmoy": this.change ,"Kamal":'',"Pratim":'',"Sourav":'',"Subhankar":'',"Swagata":''})
  //   this.dataSource = [...this.dataSource]
  //   }
  //   console.log(this.dataSource)
  // }
  saveRow(){
    const dialogRef = this.dialog.open(DialogComponent,{
      width:"350px",
      data:{
        message:"Are you really want to add this item ",
        confirm: false
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result == true){
        this.newRow.patchValue({
          date:this.length
        })
        console.log(this.newRow.value)
        console.log(this.dataSource.data)
        this.server.checkpostdata(this.newRow.value).subscribe((res:any)=>{
          this.server.checkGetData().subscribe();
        })
        window.location.reload()
        localStorage.removeItem("length");
      }else{
        window.location.reload()
        localStorage.removeItem("length");
      }
    })
    
  }
  public change: any = 0
  GetStats(event:any) {
    console.log( event.checked);
    let check = event.checked
    if(check == true){
      this.change = 1
    }else{
      this.change = 0
    }
    console.log(this.change)
    console.log(this.dataSource.data)
  }
ischeck(element:any){
  // if(element == 1){
  //   return true
  // }else{
  //   return false
  // }
}
// public newRow:any 
//  newRow = new FormGroup({
//   date: new FormControl(this.length),
//   Chinmoy: new FormControl(this.change),
//   Swagata: new FormControl(""),
//   Pratim: new FormControl(""),
//   Kamal: new FormControl(""),
//   Sourav: new FormControl(""),
//   Subhankar: new FormControl(""),  
// })
public length:any
newRow = this.fb.group({
  date: [],
  Chinmoy: [false],
  Swagata: [false],
  Pratim: [false],
  Kamal: [false],
  Sourav: [false],
  Subhankar:[false]
})
// public x : any
addRow(){
  // const newrow: User = {"date":0,"Chinmoy": this.change ,"Kamal":'',"Pratim":'',"Sourav":'',"Subhankar":'',"Swagata":''}
  // this.dataSource.data = [newrow, ...this.dataSource.data ];
  // console.log(newrow) 
  let x:any = document.getElementById('form')?.style;
  
  // if (x.style.display === "none") {
  //   x.style.display = "block";
  // } else {
  //   x.style.display = "none";
  // }
  x.display = "block"
  console.log(localStorage.getItem("length"))
  console.log(((Object.keys(this.dataSource.data).length)+1))
 this.length = ((Object.keys(this.dataSource.data).length)+1)
  console.log(length)

}
cancel(){
  window.location.reload()
}

}
