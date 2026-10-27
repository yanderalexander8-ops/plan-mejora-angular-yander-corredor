import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProfileService } from './profile.service';
import { UserProfile } from './profile.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = false;
  errorMessage = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loading = true;
    this.profileService
      .getProfile()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (profile) => (this.profile = profile),
        error: () => (this.errorMessage = 'No se pudo cargar tu perfil. Inténtalo de nuevo.'),
      });
  }

  get initials(): string {
    return this.profile ? `${this.profile.firstName.charAt(0)}${this.profile.lastName.charAt(0)}`.toUpperCase() : '';
  }
}
