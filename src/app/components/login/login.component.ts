import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { LoginData } from './interfaces/login-interfaces';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{  
  formLogin: FormGroup = new FormGroup({});
  message:boolean=true;
  dataUser:string='';
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private loginService : LoginService,
    private toastr: ToastrService  
    ){
      this.formLogin = this.fb.group({
        user:['',Validators.required],
        passw:['', Validators.required]
      })
    }


    
    ngOnInit(): void {
        
    }

    funcLogin(){
      const logindata: LoginData={
        username:this.formLogin.value.user,        
        password:this.formLogin.value.passw         
      }
      console.log("Login: ",logindata);
       
      
      if (this.formLogin.value.user != '' || this.formLogin.value.passw != '') {
        this.message = true;
        this.loginService.getLogin(logindata.username,logindata.password).subscribe(res =>{
         if (res != null) {            
            this.router.navigate(['/home']);           
            return
          } 
          this.dataUser = this.formLogin.value.user
          this.message = false;   
          //this.toastr.error('Usuario y/o contraseña incorrecta', 'Error:');                 
        }) 
        return;      
      }       
      this.toastr.error('Los campos, nombre usuario y contraseña son obligatorios', 'Error:');    
    }
}
