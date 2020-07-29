import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { AuthenticationService } from './shared/authentication.service';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { LoginObject } from './shared/login-object.model';
import { Session } from '../core/models/session.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: { code: number, message: string } = null;

  /*  title = 'login';  lg_email:string;  lg_pass:string;*/

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.valid) {
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error;
        }
      )
    }
  }
  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

  /*
  login(){
    if(this.lg_email=="admin"&&this.lg_pass=="a123"){
      console.log("Welcome");
      //this.snackBar.open('Bienvenido','',{duration:1000})
    }else{
      console.log("Error");
      //this.snackBar.open('Error, favor de verificar los d','',{duration:1000})
    }
  }*/
}
