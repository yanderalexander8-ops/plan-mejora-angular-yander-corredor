import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppNotification } from '../models/notification.model';

// Servicio para mostrar mensajes de confirmación o de error (toasts).
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 1;
  private readonly subject = new BehaviorSubject<AppNotification[]>([]);
  readonly notifications$ = this.subject.asObservable();

  success(message: string, detail?: unknown): void {
    this.add('success', message, detail);
  }

  error(message: string, detail?: unknown): void {
    this.add('error', message, detail);
  }

  dismiss(id: number): void {
    this.subject.next(this.subject.value.filter((n) => n.id !== id));
  }

  private add(type: AppNotification['type'], message: string, detail?: unknown): void {
    const id = this.nextId++;
    const text =
      detail === undefined ? undefined : typeof detail === 'string' ? detail : JSON.stringify(detail, null, 2);
    this.subject.next([...this.subject.value, { id, type, message, detail: text }]);
    // Se cierra sola después de 8 segundos
    setTimeout(() => this.dismiss(id), 8000);
  }
}
