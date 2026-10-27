export interface AppNotification {
  id: number;
  type: 'success' | 'error';
  message: string;
  detail?: string;
}
