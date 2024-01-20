import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  facebookLogin = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.facebookLogin = `${environment.baseUrl}${environment.authUrl}facebook`;
  }

  register() {
    this.router.navigateByUrl('auth/register');
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.apiService.login.post(this.form.value).subscribe({
        next: res => {
          if (res.success) {
            this.authService.setAuthToken(res.data.token);
            this.authService.setProfileData(res.data.user);
            this.router.navigateByUrl('');
          } else {
            console.error(res.message);
          }
        }
      });
    }
  }

}
