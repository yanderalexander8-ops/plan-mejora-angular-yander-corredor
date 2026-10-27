import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from '../constants/api.constants';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

// Agrega "Authorization: Bearer <token>" a las peticiones hacia la API.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private notifications: NotificationService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();

    // Solo se agrega el token si hay sesión y la petición va hacia DummyJSON
    const request =
      token && req.url.startsWith(API_URL)
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next.handle(request).pipe(
      catchError((error: unknown) => {
        // Si el token venció (401) se cierra la sesión
        if (error instanceof HttpErrorResponse && error.status === 401 && token) {
          this.notifications.error('Tu sesión expiró. Inicia sesión de nuevo.');
          this.auth.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
