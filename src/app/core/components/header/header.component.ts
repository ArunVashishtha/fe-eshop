import { Component } from '@angular/core';
import { ProfileData } from '../../models/auth-models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false;
  profileData!: ProfileData | null;

  constructor(
    private authService: AuthService
  ) {
    this.authService.isAuthenticated.subscribe(res => {
      this.isLoggedIn = res;
    });
    this.authService.profileData.subscribe(res => {
      this.profileData = res;
    });
  }

  logout() {
    this.authService.logout();
  }
  
  handleAddToCartCountUpdate($event:any) {

  }
}
