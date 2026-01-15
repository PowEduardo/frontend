import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Toast notification type.
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast notification model.
 */
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // milliseconds, 0 = never auto-dismiss
  timestamp: Date;
}

/**
 * Service for managing toast notifications.
 * Emits toast events that UI components can subscribe to and display.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private autoIncrement = 0;

  /**
   * Observable of all active toasts.
   */
  toasts(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  /**
   * Show a success notification.
   */
  success(message: string, duration = 5000): void {
    this.show(message, 'success', duration);
  }

  /**
   * Show an error notification.
   */
  error(message: string, duration = 7000): void {
    this.show(message, 'error', duration);
  }

  /**
   * Show a warning notification.
   */
  warning(message: string, duration = 6000): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Show an info notification.
   */
  info(message: string, duration = 5000): void {
    this.show(message, 'info', duration);
  }

  /**
   * Generic method to show a toast.
   */
  private show(message: string, type: ToastType, duration = 5000): void {
    const id = `toast-${++this.autoIncrement}`;
    const toast: Toast = {
      id,
      message,
      type,
      duration,
      timestamp: new Date()
    };

    const currentToasts = this.toasts$.value;
    this.toasts$.next([...currentToasts, toast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  /**
   * Remove a toast by ID.
   */
  remove(id: string): void {
    const updated = this.toasts$.value.filter(t => t.id !== id);
    this.toasts$.next(updated);
  }

  /**
   * Clear all toasts.
   */
  clearAll(): void {
    this.toasts$.next([]);
  }
}
