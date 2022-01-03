
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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

  @ViewChild('paginator') paginator !: MatPaginator

 async ngOnInit(){
    this.server.checkGetData().subscribe((res:any)=>{this.dataSource.data = res,
    this.dataSource.paginator = this.paginator}, 
    (error:any)=>{this.router.navigate([''])})
  }
  displayedColumns: string[] = Object.keys(UserSchema);
  dataSchema = UserSchema;
  dataSource = new MatTableDataSource<User>();
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
    let check = event.checked
    if(check == true){
      this.change = 1
    }else{
      this.change = 0
    }
  }
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
addRow(){ 
  let x:any = document.getElementById('form')?.style;
  x.display = "block"
 this.length = ((Object.keys(this.dataSource.data).length)+1)
}
cancel(){
  window.location.reload()
}
colour(element:any){
  if(element === true){
    return "primary"
  }else{
    return "warn"
  }
}

}
