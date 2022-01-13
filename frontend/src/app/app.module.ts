import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { AddDataComponent } from './add-data/add-data.component';
import { RegisterComponent } from './register/register.component';
import { GoogleLoginProvider,SocialLoginModule } from 'angularx-social-login';
import { AuthGuardService } from './auth-guard.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatDialogModule} from '@angular/material/dialog';
import { CheckboxSheetComponent } from './checkbox-sheet/checkbox-sheet.component';
import { DialogComponent } from './dialog/dialog.component';
import { HistoryComponent } from './history/history.component';
import { PayDialogComponent } from './pay-dialog/pay-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    AddDataComponent,
    RegisterComponent,
    CheckboxSheetComponent,
    DialogComponent,
    HistoryComponent,
    PayDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    NgHttpLoaderModule.forRoot(),
    SocialLoginModule,
    MatPaginatorModule,
    DragDropModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule
  ],

  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('701202602079-njqfafnsq0uuhfgpfi6hshrc570uhjp9.apps.googleusercontent.com') // your client id
        }
      ]
    }
  },
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
