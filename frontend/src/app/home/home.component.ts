import { Component,OnInit, ViewChild} from '@angular/core';
import { ServerService } from '../server.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {iElement} from '../interface/element';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  public test: any;

  constructor( private server:ServerService , private router:Router,public socialAuthService:SocialAuthService, public dialog: MatDialog ) { }

  public text:any;
  public name:any;
  // public test:any;
  public authenticate = true;
  @ViewChild('paginator') paginator !: MatPaginator
  // ngAfterViewInit() {
  //   this.datasource.paginator = this.paginator;
  // }
  async ngOnInit() {
    this.server.getTable().subscribe((data:any)=>{this.datasource=new MatTableDataSource(data),
    this.datasource.paginator = this.paginator},
    (error:any)=>{this.router.navigate([''])})
    
    this.test = localStorage.getItem("name");
    this.patchvalue=this.server.editdata()
    // SOCKET

  }

  public movies:any
  public d = new Date();
  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  public month = this.monthNames[this.d.getMonth()];
  public year = this.d.getFullYear();
  public datasource :any
  displayedColumns: string[] = ['date', 'name', 'description', 'amount','action','delete' ];

  editform = new FormGroup({
    id: new FormControl(''),
    username:new FormControl(''),
    email: new FormControl(''),
  })

  onaddrow(){
    let data = document.getElementById('form')?.style
    if(data){
      data.display = "block"
    }
  }

  async ondelete(element:any){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message:"Are you really want to delete this item ",
        confirm: false
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result === true){
        this.datasource.forEach((value:any,dex:any) => {
          if(value == element){
            this.server.deleteData(element).subscribe((res:any)=>{
            this.server.getTable().subscribe((data:any)=>{this.datasource= data})
       })     
      }
    })
      }
    })
  }
  public data:any
  public patchvalue:any=[]
  onedit(element:any){


    let selectedUid = element.uid
    this.router.navigate(['/home/add'],{queryParams:{uid:selectedUid}})
    if(!localStorage.getItem('initData')){
      localStorage.setItem("editData",JSON.stringify(element))
     }
}
  public due:any
 async checkamount(){
    let res:any = await this.server.checkData(this.test).toPromise();
    this.due = res["due"]

    if(!localStorage.getItem('initData')){
      localStorage.setItem("due",this.due)
     }
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '350px',
      data:{
        text:this.test,
        message: this.due,
        confirm:true
      }
    })
    }
    onlogout(){
      // this.router.navigate([''])
      // localStorage.removeItem("token")
      const dialogRef = this.dialog.open(DialogComponent,{
        width:'350px',
        data:{
          message:'Are you really want to log out',
          confirm:false
        }
      })
      dialogRef.afterClosed().subscribe((result:any)=>{
        if(result===true){
          this.router.navigate([''])
          localStorage.removeItem("token")
        }
      })
  }
  // drop-down
  // drop-down
  @ViewChild('dataTable')
  table!: MatTable<iElement>;
  drop(event: CdkDragDrop<MatTableDataSource<any[]>,any>): void {
      // moveItemInArray(this.datasource, event.previousIndex, event.currentIndex);
      // this.datasource= [...this.datasource]
      // this.datasource = new MatTableDataSource
      // this.datasource.data = clonedeep(this.datasource.data);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data.data, event.previousIndex, event.currentIndex);
      } 
      else {
        transferArrayItem(event.previousContainer.data.data, event.container.data.data, event.previousIndex, event.currentIndex);
      }
      console.log(this.datasource)
  }

  // paginator
  // @ViewChild('paginator') paginator!: MatPaginator;
}


