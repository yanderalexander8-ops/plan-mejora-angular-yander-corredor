import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StoredUser } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly user$: Observable<StoredUser | null>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  initials(user: StoredUser): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  logout(): void {
    this.auth.logout();
  }
}
