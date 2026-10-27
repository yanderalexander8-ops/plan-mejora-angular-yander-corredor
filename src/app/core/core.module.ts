import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// CoreModule: servicios y piezas que existen una sola vez en toda la app.
// Se importa únicamente en AppModule.
// - AuthService, NotificationService -> providedIn: 'root' (una sola instancia)
// - authGuard y guestGuard -> carpeta guards
// - AuthInterceptor -> se registra aquí
@NgModule({
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule | null) {
    if (parentModule) {
      throw new Error('CoreModule ya fue importado. Impórtalo solo en AppModule.');
    }
  }
}
