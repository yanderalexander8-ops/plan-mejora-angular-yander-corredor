import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly user$: Observable<unknown>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }
}
