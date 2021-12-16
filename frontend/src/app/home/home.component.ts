import { Component, OnInit, ViewChild} from '@angular/core';
import { ServerService } from '../server.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ipatch } from '../interface/patch';
import {iElement} from '../interface/element'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  public test: any;

  constructor( private server:ServerService , private router:Router,public socialAuthService:SocialAuthService,) { }

  public text:any;
  public name:any;
  // public test:any;
  public authenticate = true;
  // @ViewChild(MatPaginator)private paginator : MatPaginator
  ngAfterViewInit() {
    // this.datasource.paginator = this.paginator;
  }
  async ngOnInit() {
    this.server.getTable().subscribe(data=>{this.datasource=data},error=>{this.router.navigate([''])})
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
    this.datasource.forEach((value:any,dex:any) => {
      if(value == element){
        // this.datasource.splice(dex,1)
        console.log(element.uid)
       this.server.deleteData(element).subscribe()
         
      }
      
    })
  }
  public data:any
  public patchvalue:any=[]
  onedit(element:any){


    let selectedUid = element.uid
    this.router.navigate(['/home/add'],{queryParams:{uid:selectedUid}})
  }
  public due:any
 async checkamount(){
    let res:any = await this.server.checkData(this.test).toPromise();
    this.due = res["due"]
    if(this.due >= 0){
      alert("You will get "+this.due+" Rs")
    }else{
      alert("You will pay "+ Math.abs(this.due) +" Rs")
    }

    }
    onlogout(){
      this.router.navigate([''])
      localStorage.removeItem("token")
  }
  // drop-down
  // drop-down
  @ViewChild('dataTable')
  table!: MatTable<iElement>;
  dropTable(event: CdkDragDrop<any[]>): void {
      moveItemInArray(this.datasource, event.previousIndex, event.currentIndex);
      this.datasource= [...this.datasource]
  }
}
