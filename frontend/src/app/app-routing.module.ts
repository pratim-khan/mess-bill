import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { CheckboxSheetComponent } from './checkbox-sheet/checkbox-sheet.component';
import { HistoryComponent } from './history/history.component';
// import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path:'signin' , component: SignInComponent},
  {path:'' , redirectTo:'/signin' ,pathMatch:'full'},
  { path:'home', component:HomeComponent, },
  { path:'register',component:RegisterComponent},
  {path:'home/add',component:AddDataComponent},
  {path:'home/history',component:HistoryComponent},
  {path:'home/check',component:CheckboxSheetComponent},
  {path:'**',redirectTo:'/signin',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
