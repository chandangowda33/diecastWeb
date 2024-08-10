import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSubject = new BehaviorSubject<boolean>(false);
  private registerSubject = new BehaviorSubject<boolean>(false);
  private loginSuccessSubject = new BehaviorSubject<string>('');
  login$ = this.loginSubject.asObservable();
  register$ = this.registerSubject.asObservable();
  loginSuccess$ = this.loginSuccessSubject.asObservable();
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  toggleLogin() {
    this.loginSubject.next(!this.loginSubject.value);
  }
  toggleRegister() {
    this.registerSubject.next(!this.registerSubject.value);
  }

  loggedIn(message: string) {
    this.loginSuccessSubject.next(message);
  }

  register(userDetails: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}userRegisteration/register`,
      userDetails
    );
  }

  login(userDetails: any): Observable<any> {
    console.log('service');
    return this.http.post(
      `${this.baseUrl}userRegisteration/loginUser`,
      userDetails
    );
  }
}
