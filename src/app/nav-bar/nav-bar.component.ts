import { Component } from '@angular/core';
import { UserAuthService } from "../services/user.auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private authService: UserAuthService) {
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn;
  }

  onLogout() {
    return this.authService.logout();
  }
}
