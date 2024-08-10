import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  activeLink = 'home';
  isloggedIn: boolean = false;
  name: string = 'Chandan';
  logo: string = 'C';
  isDropdown: boolean = false;
  isSeller: boolean = false;
  isHome: boolean = true;

  constructor(
    private route: Router,
    private login: LoginService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let path = this.route.url;
    console.log(path);
    if (path == '/home' || path == '/') {
      console.log(true);
      this.isHome = true;
    } else this.isHome = false;
    this.auth.isLoggedIn$.subscribe((value) => {
      console.log(value);
      if (value) {
        this.name = this.auth.getUserName();
        this.logo = this.name.split('')[0].toUpperCase();
        if (this.auth.getRole() == 'seller') {
          this.isSeller = true;
        } else this.isSeller = false;
        this.isloggedIn = !this.isloggedIn;
      }
    });
  }

  uploadNewItem() {
    this.route.navigate(['/newItem']);
  }

  shouldShowSearch(): boolean {
    return this.route.url !== '/home';
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
  }

  toggleLogin() {
    this.login.toggleLogin();
  }
  toggleRegister() {
    this.login.toggleLogin();
    this.login.toggleRegister();
  }

  logout() {
    console.log('logout');
    this.auth.clearToken();
    this.isloggedIn = !this.isloggedIn;
    this.login.loggedIn('You logged out Successfully');
  }
}
