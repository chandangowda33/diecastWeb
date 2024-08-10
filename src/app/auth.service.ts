import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtToken = 'JWT token';
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userName: string = '';
  private role: string = 'user';
  private number: string = '';

  constructor(private route: Router) {}

  setToken(token: string) {
    localStorage.setItem(this.jwtToken, token);
    console.log('in auth service');
    console.log(token);
  }
  getToken() {
    localStorage.getItem(this.jwtToken);
  }
  clearToken(): void {
    localStorage.removeItem(this.jwtToken);
    this.toggleIsLogin();
    this.route.navigate(['/home']);
    this.userName = '';
  }
  getUserName() {
    return this.userName;
  }
  setUserName(username: string) {
    this.userName = username.split(' ')[0];
  }

  toggleIsLogin() {
    this.isLoggedInSubject.next(!this.isLoggedInSubject.value);
  }

  getRole() {
    return this.role;
  }
  setRole(role: string) {
    this.role = role;
  }

  getNumber() {
    return this.number;
  }
  setNumber(number: string) {
    this.number = number;
  }
}
