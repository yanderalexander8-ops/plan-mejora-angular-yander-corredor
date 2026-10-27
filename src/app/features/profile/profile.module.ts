import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

// ProfileModule: carga perezosa en /profile (protegido con authGuard)
@NgModule({
  declarations: [ProfileComponent],
  imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
