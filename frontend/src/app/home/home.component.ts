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
import { PayDialogComponent } from '../pay-dialog/pay-dialog.component';
import { AuthGuardService } from '../auth-guard.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  public test: any;
  public phone :any = localStorage.getItem('phone')
  constructor( private server:ServerService ,private auth:AuthGuardService, private router:Router,public socialAuthService:SocialAuthService, public dialog: MatDialog ) { }

  public text:any;
  public name:any;
  public authenticate = true;
  @ViewChild('paginator') paginator !: MatPaginator

  async ngOnInit() {
    this.server.getTable(this.month , this.year).subscribe((data:any)=>{this.datasource.data= data,
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
  datasource = new MatTableDataSource<any>();
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
        this.datasource.data.forEach((value:any,dex:any) => {
          if(value == element){
            this.server.deleteData(element).subscribe((res:any)=>{
            this.server.getTable(this.month , this.year).subscribe((data:any)=>{this.datasource.data= data})
       })     
      }
    })
      }else{
        window.location.reload()
      }
    }
    )
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
  public Due:any
 async checkamount(){
    let res:any = await this.server.checkData(this.month,this.year).toPromise();
    // let Due:any
    // let due:any
    for(let item of res){
      if(Object.keys(item).toString() == this.test){
        this.Due = parseInt(Object.values(item).toString())
      }
    }
    if(this.Due <= 0){
      this.due = "You will pay " + this.Due*(-1)
      const dialogRef = this.dialog.open(PayDialogComponent,{
        width: '350px',
        data:{
          text:this.test,
          message: this.due,
          confirm: true
        }
      })
      dialogRef.afterClosed().subscribe((result:any)=>{
        if(result == true){
          rzp1.open();
        }
      })
      }else{
      this.due = "You will get " + this.Due
      const dialogRef = this.dialog.open(DialogComponent,{
        width: '350px',
        data:{
          text:this.test,
          message: this.due,
          confirm: true
        }
      })
      }
    if(!localStorage.getItem('initData')){
      localStorage.setItem("due",this.due)
     }
     //////////////////// payment gateway
     let options = {
      "key": "rzp_test_wbLiqixE7ZkHlw", 
    "amount": this.Due * (-1) *100, 
    "currency": "INR",
    "name": "Mess Bill",
    "description": "Test Transaction",
    // "image": "https://example.com/your_logo",
    "order_id": "", 
    "handler": function (response:any){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": this.test,
        "email": this.test+"@gmail.com",
        "contact": this.phone
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#4651A6"
    }
  };
  let rzp1:any = new this.auth.nativeWindow.Razorpay(options);

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
  }


}


