import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/HomeComponent';
import { ErrorComponent } from './components/error/error.component';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MenubarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    MenuModule,  
    ButtonModule, 
    ProgressSpinnerModule,
    ToastrModule.forRoot({      
      timeOut: 2000,      
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
