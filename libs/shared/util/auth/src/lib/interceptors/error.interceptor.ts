import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@virteex/shared-ui';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 401) {
             errorMessage = 'Session expired or unauthorized.';
        } else if (error.status === 403) {
             errorMessage = 'You do not have permission to perform this action.';
        } else if (error.status === 404) {
             errorMessage = 'Resource not found.';
        } else if (error.status >= 500) {
             errorMessage = 'Server error. Please try again later.';
        } else if (error.error && error.error.message) {
             // NestJS often returns { statusCode, message, error }
             errorMessage = Array.isArray(error.error.message)
                ? error.error.message.join(', ')
                : error.error.message;
        } else {
             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      toastService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};
