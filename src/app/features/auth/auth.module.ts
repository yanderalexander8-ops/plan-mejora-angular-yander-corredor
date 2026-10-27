import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

// AuthModule: carga perezosa en /auth
@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
