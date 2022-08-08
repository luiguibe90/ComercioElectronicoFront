import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroupLogin!: FormGroup;
  passwordMessage: string = "";
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.buildFormGroupLogin();
    // alert('USUARIOS PARA AUTENTICARSE:\nUsuario: Byron, Contraseña: 123\nUsuario: Maria, Contraseña: MiContrasena\nUsuario: Evelyn, Contraseña: Eve123');
  }

  login(loginBody:Login){
    this.authService.login(loginBody);
  }

  buildFormGroupLogin(){
    this.formGroupLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get userNameField() {
    return this.formGroupLogin.get('userName');
  }
  get passwordField() {
    return this.formGroupLogin.get('password');
  }
  
  onSubmit(event: Event){
    event.preventDefault();
    console.log(this.formGroupLogin)
    if(this.formGroupLogin.valid){
      this.login(this.formGroupLogin.getRawValue());
    }else{
    }
  }
}
