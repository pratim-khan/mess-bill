import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path:'signin' , component: SignInComponent},
  {path:'' , redirectTo:'/signin' ,pathMatch:'full'},
  { path:'home', component:HomeComponent},
  {path:'home/add',component:AddDataComponent},
  {path:'**',redirectTo:'/signin',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }