import { Component, OnInit} from '@angular/core';
import { ServerService } from '../server.service';
// import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  public test: any;

  constructor( private server:ServerService , private router:Router ) { }

  public text:any;
  public name:any;
  // public test:any;
  public authenticate = true
  async ngOnInit() {
    // this.server.getTable(this.authenticate).subscribe(res => this.datasource = res );
    let res:any = await this.server.getTable(this.authenticate).toPromise();
    this.datasource = res["data"]
    this.test = localStorage.getItem("name");
    this.patchvalue=this.server.editdata()
    console.log(typeof(this.authenticate)),
    console.log(this.authenticate)

  }
  public d = new Date();
  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  public month = this.monthNames[this.d.getMonth()];
  public year = this.d.getFullYear();
  public datasource:any
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
        // this.server.getTable().subscribe(res => this.datasource = res )
         
      }
      
    })
    this.server.getTable(this.authenticate).subscribe()
  }
  public data:any
  public patchvalue:any=[]
  onedit(element:any){
    // let data = document.getElementById('edit')?.style
    // if(data){
    //   data.display = "block"
    //   this.editform.patchValue(element)
    //   console.log(this.editform.value)
      
    // }
    console.log(element)
    let selectedUid = element.uid
    this.router.navigate(['/home/add'],{queryParams:{uid:selectedUid}})
    // console.log(JSON.parse(demo))
  }
  // console.log(localStorage.getItem(this.name));
  // public test = localStorage.getItem(this.gs.name)
  
  // editdone(){
  //   this.datasource= [...this.datasource, this.dataform.value]
  //   this.server.updatedata(this.editform.value).subscribe()
  //   let data = document.getElementById('edit')?.style
  //   if(data){
  //     data.display = "none"
  //   }
  //   this.server.getTable().subscribe(res => this.datasource = res )
  // }
  public due:any
 async checkamount(){
    let res:any = await this.server.checkData(this.test).toPromise();
    this.due = res["due"]
    if(this.due >= 0){
      alert("You will get "+this.due+" Rs")
    }else{
      alert("You will pay "+ Math.abs(this.due) +" Rs")
    }
    // this.dialog.open(
    //   dueDialog,{
    //     data:{
    //       message:'you will get ' + this.due
    //     }
    //   }
    // )

    }
    onlogout(){
      this.router.navigate([''])
      this.authenticate = false
      if (this.authenticate == false){
        alert("Are you sure to logout ?")
      }
      console.log(this.authenticate)
    }
  }

