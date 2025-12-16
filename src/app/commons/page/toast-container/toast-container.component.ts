import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../service/notification.service';
import { Subscription } from 'rxjs';

/**
 * Toast Container Component
 * Displays notifications using Bootstrap alert styles.
 * Should be placed in app.component.html
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService],
  template: `
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 9999;">
      @for (toast of toasts; track toast.id) {
        <div [class]="'alert alert-' + getAlertClass(toast.type) + ' alert-dismissible fade show d-flex align-items-center mb-2'" 
             role="alert"
             [@toastAnimation]>
          <i [class]="getIconClass(toast.type) + ' me-2'"></i>
          <div>{{ toast.message }}</div>
          <button type="button" 
                  class="btn-close" 
                  (click)="notificationService.remove(toast.id)"
                  aria-label="Close"></button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription?: Subscription;

  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.toasts().subscribe((toasts: Toast[]) => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Map toast type to Bootstrap alert class.
   */
  getAlertClass(type: string): string {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

  /**
   * Get Bootstrap icon class based on toast type.
   */
  getIconClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle-fill text-success';
      case 'error':
        return 'bi bi-exclamation-circle-fill text-danger';
      case 'warning':
        return 'bi bi-exclamation-triangle-fill text-warning';
      case 'info':
        return 'bi bi-info-circle-fill text-info';
      default:
        return 'bi bi-info-circle-fill text-info';
    }
  }
}
