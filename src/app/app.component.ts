import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'diecastResell';
  message: string = '';
  isVisible: boolean = false;

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.loginService.loginSuccess$.subscribe((message) =>
      this.showTab(message)
    );
  }

  showTab(message: string) {
    this.message = message;

    if (message) {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 5000);
    }
  }
}
