import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ProfileData } from '../models/auth-models';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profileData = new BehaviorSubject<ProfileData | null>(null);

  isAuthenticated = new BehaviorSubject(false);

  constructor(
    private apiService: ApiService
  ) {
  }

  setAuthToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  fetchProfileData() {
    this.apiService.getProfile.get().subscribe({
      next: res => {
        this.setProfileData(res);
      }
    });
  }

  setProfileData(res: ProfileData) {
    this.isAuthenticated.next(true);
    this.profileData.next(res);
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.isAuthenticated.next(false);
    this.profileData.next(null);
  }
}
