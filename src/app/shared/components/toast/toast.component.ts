import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppNotification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';

// Muestra los mensajes de confirmación / error que envía NotificationService
@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  readonly notifications$: Observable<AppNotification[]>;

  constructor(private service: NotificationService) {
    this.notifications$ = this.service.notifications$;
  }

  close(id: number): void {
    this.service.dismiss(id);
  }
}
