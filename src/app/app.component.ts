import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fe-eshop';

  constructor(
    private authService: AuthService
  ) {
    this.authService.fetchProfileData();
  }
}
