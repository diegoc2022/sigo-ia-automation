import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/HomeComponent';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:'',title:'Login',component:LoginComponent}, 
  {path:'',redirectTo:'/',pathMatch:'full'},
  {path:'home',title:'Home',component:HomeComponent},
  {path:'',title:'Page-no-found-component',component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
