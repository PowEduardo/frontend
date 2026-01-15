import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, ToastType } from '../../service/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: `
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 9999;">
      @for (toast of notificationService.toasts() | async; track toast.id) {
        <div
          class="alert alert-{{ getAlertClass(toast.type) }} alert-dismissible fade show d-flex align-items-center mb-2"
          role="alert"
          @toastAnimation
        >
          <i [class]="getIconClass(toast.type) + ' me-2'"></i>
          <div class="flex-grow-1">{{ toast.message }}</div>
          <button
            type="button"
            class="btn-close"
            (click)="notificationService.remove(toast.id)"
            aria-label="Close">
          </button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {

  constructor(public notificationService: NotificationService) {}

  getAlertClass(type: ToastType): string {
    switch (type) {
      case 'success': return 'success';
      case 'error':   return 'danger';
      case 'warning': return 'warning';
      case 'info':    return 'info';
      default:        return 'info';
    }
  }

  getIconClass(type: ToastType): string {
    switch (type) {
      case 'success': return 'bi bi-check-circle-fill text-success';
      case 'error':   return 'bi bi-exclamation-circle-fill text-danger';
      case 'warning': return 'bi bi-exclamation-triangle-fill text-warning';
      case 'info':    return 'bi bi-info-circle-fill text-info';
      default:        return 'bi bi-info-circle-fill text-info';
    }
  }
}
