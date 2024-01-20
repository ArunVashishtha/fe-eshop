import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/)]),
    contactNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    gender: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  register() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.apiService.register.post(this.form.value).subscribe({
        next: res => {
          if (res.success) {
            this.authService.setAuthToken(res.data.token);
            this.authService.setProfileData(res.data.user);
            this.router.navigateByUrl('');
          } else {
            console.error(res.message);
          }
        }
      })
    }
  }

}
