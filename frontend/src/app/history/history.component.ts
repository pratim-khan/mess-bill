import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  get month() {
    return this.newForm.get('month')
  }
  get year() {
    return this.newForm.get('year')
  }

  constructor(private fb:FormBuilder, private server:ServerService ,private router:Router) { }

  ngOnInit(): void {
    for(let i=2022;i>=1970;i--){
      this.yearRange.push(i)
    }
  }
  public test = localStorage.getItem("name")
  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  public yearRange:any = []
  newForm = this.fb.group({
    month:["",Validators.required],
    year:["",Validators.required]
  })
  @ViewChild('paginator') paginator !: MatPaginator
  public dataSource = new MatTableDataSource<any>()
  public displayedColumns: string[] = ['date', 'name', 'description', 'amount'];
  public datasource = new MatTableDataSource<any>()
  public displayColumns :string[] =['date','Chinmoy','Kamal','Pratim','Sourav','Subhankar','Swagata']
  onHistory(){
    this.server.getTable(this.newForm.value.month,this.newForm.value.year).subscribe(
      (data: any)=> {this.dataSource.data = data,
        this.dataSource.paginator = this.paginator
      },(error:any)=>{this.router.navigate([''])
      })
    this.server.checkGetData(this.newForm.value.month,this.newForm.value.year).subscribe((data:any)=>{this.datasource.data=data,
     this.datasource.paginator = this.paginator
    })
    
    let x:any = document.getElementById('matTab')?.style;
    x.display = "block"
  }
  onCancel(){
    this.newForm.reset()
    let x:any = document.getElementById('matTab')?.style;
    x.display = "none"
  }
  onHome(){
    this.router.navigate(['home'])
  }


  
}
