import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../core/constants/api.constants';
import { UserProfile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  // No se envía el token aquí: lo agrega el interceptor automáticamente
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${API_URL}/auth/me`);
  }
}
