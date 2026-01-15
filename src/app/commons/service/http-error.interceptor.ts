import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap, take } from 'rxjs/operators';
import { NotificationService } from './notification.service';

/**
 * HTTP Error Interceptor
 * Handles all HTTP errors globally:
 * - Retry on network/timeout errors
 * - Show user-friendly error messages
 * - Log errors for debugging
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private notificationService = inject(NotificationService);


  // Configuration
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY_MS = 1000;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Retry on network/timeout errors (not on 4xx or 5xx)
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            // Only retry on network errors or 5xx errors
            if (this.isRetryable(error) && index < this.MAX_RETRIES) {
              const delayMs = this.RETRY_DELAY_MS * Math.pow(2, index); // exponential backoff
              console.warn(`Retrying request (${index + 1}/${this.MAX_RETRIES}) after ${delayMs}ms:`, request.url);
              return timer(delayMs);
            }
            // Don't retry, throw error
            return throwError(() => error);
          }),
          take(this.MAX_RETRIES)
        )
      ),
      // Handle any remaining errors
      catchError((error: HttpErrorResponse) => {
        this.handleError(error, request);
        return throwError(() => error);
      })
    );
  }

  /**
   * Determine if an error is retryable (network errors, timeouts, 5xx).
   */
  private isRetryable(error: unknown): boolean {
    // Type guard for HttpErrorResponse
    if (!(error instanceof HttpErrorResponse)) {
      return false;
    }
    
    const httpError = error as HttpErrorResponse;
    // Network errors have status 0
    if (httpError.status === 0) {
      return true;
    }
    // Retry on server errors (5xx)
    if (httpError.status >= 500) {
      return true;
    }
    // Don't retry on client errors (4xx)
    return false;
  }

  /**
   * Handle and display error messages to user.
   */
  private handleError(error: HttpErrorResponse, request: HttpRequest<unknown>): void {
    let message = 'An error occurred';

    if (error.status === 0) {
      // Network error
      message = 'Network error. Please check your connection.';
    } else if (error.status === 400) {
      // Bad request
      message = error.error?.message || 'Invalid request. Please check your input.';
    } else if (error.status === 401) {
      // Unauthorized
      message = 'Session expired. Please log in again.';
      // TODO: Redirect to login
    } else if (error.status === 403) {
      // Forbidden
      message = 'Access denied. You do not have permission to perform this action.';
    } else if (error.status === 404) {
      // Not found
      message = 'Resource not found.';
    } else if (error.status === 409) {
      // Conflict
      message = error.error?.message || 'Request conflict. Please try again.';
    } else if (error.status >= 500) {
      // Server error
      message = 'Server error. Please try again later.';
    } else if (error.status > 0) {
      // Other HTTP errors
      message = error.error?.message || `HTTP ${error.status}: ${error.statusText}`;
    }

    // Log error details for debugging
    console.error(`[HTTP Error] ${request.method} ${request.url}:`, {
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      error: error.error
    });

    // Show notification to user
    this.notificationService.error(message);
  }
}
