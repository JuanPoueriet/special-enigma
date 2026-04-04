import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'COMMON.ERROR';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = error.error.message;
      } else {
        // Server-side error
        if (error.status === 401) {
             errorMessage = 'AUTH.SESSION_EXPIRED';
        } else if (error.status === 403) {
             errorMessage = 'AUTH.NO_PERMISSION';
        } else if (error.status === 404) {
             errorMessage = 'COMMON.NOT_FOUND';
        } else if (error.status >= 500) {
             errorMessage = 'COMMON.SERVER_ERROR';
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
