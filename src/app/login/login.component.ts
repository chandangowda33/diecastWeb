import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  toLogin: boolean = true;
  toRegister: boolean = false;
  registerForm: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage = '';
  isRegistered: boolean = false;
  registerMsg = 'Successfully registered please login';
  isErrorReg: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginServive: LoginService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      phonenumber: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  registerNow() {
    this.toLogin = !this.toLogin;
    this.toRegister = !this.toRegister;
  }

  register() {
    this.isLoading = true;
    const userdetails = {
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      fullName: this.registerForm.get('fullName')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this.loginServive.register(userdetails).subscribe(
      (response) => {
        // console.log(response);
        this.isRegistered = true;
        this.registerNow();
        this.isLoading = false;
      },
      (error) => {
        this.isErrorReg = true;
        console.log(error.error.errorData.code);

        if (error.error.errorData.code == '11000') {
          console.log('here');
          this.isErrorReg = true;
          this.errorMessage = 'Phone number already exists,please login';
        }

        this.isLoading = false;
      }
    );
  }

  login() {
    this.isLoading = true;
    const userdetails = {
      phoneNumber: this.loginForm.get('phonenumber')?.value,
      password: this.loginForm.get('password')?.value,
    };
    console.log(userdetails);
    this.loginServive.login(userdetails).subscribe(
      (response) => {
        // console.log(response);
        if (response.status === 'Success') {
          this.auth.setUserName(response.user.fullName);
          this.auth.setToken(response.jwt);
          this.auth.setNumber(response.user.phoneNumber);
          this.auth.setRole(response.user.role);
          this.auth.toggleIsLogin();
          this.loginServive.toggleLogin();
          this.loginServive.loggedIn(response.message);
        }
        this.isLoading = false;
      },
      (error) => {
        // console.error(error);
        if (error.status === 401) {
          this.errorMessage = error.error.message;
          this.isError = !this.isError;
        } else {
          console.log('An error occurred:', error);
        }
        this.isLoading = false;
      }
    );
  }
}
