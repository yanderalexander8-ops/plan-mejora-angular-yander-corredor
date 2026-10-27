import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_URL, TOKEN_KEY, USER_KEY } from '../constants/api.constants';
import { LoginRequest, LoginResponse, StoredUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Guarda el usuario actual (o null si no hay sesión) y avisa a quien lo escuche (ej. la barra de navegación)
  private readonly userSubject = new BehaviorSubject<StoredUser | null>(this.readStoredUser());
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Inicia sesión: POST /auth/login y guarda token + datos básicos en localStorage
  login(username: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { username, password, expiresInMins: 30 };
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, body).pipe(
      tap((res) => {
        const user: StoredUser = {
          id: res.id,
          username: res.username,
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName,
          image: res.image,
        };
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  // Cierra sesión: borra localStorage y redirige al login
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): StoredUser | null {
    return this.userSubject.value;
  }

  private readStoredUser(): StoredUser | null {
    try {
      if (!localStorage.getItem(TOKEN_KEY)) {
        return null;
      }
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as StoredUser) : null;
    } catch {
      return null;
    }
  }
}
