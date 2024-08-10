import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  login: boolean = false;
  register: boolean = false;

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.loginService.login$.subscribe((value) => {
      this.login = value;
    });
    this.loginService.register$.subscribe((value) => {
      this.register = value;
    });
  }
}
