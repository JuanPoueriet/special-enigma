import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'COMMON.ERROR';
      const responseError = error.error as Record<string, unknown> | null;
      const messageFromBody = responseError?.['message'];
      const dbCode = responseError?.['code'];
      const detail = responseError?.['detail'];

      if (error.error instanceof ErrorEvent) {
        // Client-side error (user-friendly)
        errorMessage = error.error.message;
      } else {
        // Server-side error
        if (error.status === 0) {
          errorMessage = 'COMMON.NETWORK_ERROR';
        } else if (error.status === 401) {
          errorMessage = 'AUTH.SESSION_EXPIRED';
        } else if (error.status === 403) {
          errorMessage = 'AUTH.NO_PERMISSION';
        } else if (error.status === 404) {
          errorMessage = 'COMMON.NOT_FOUND';
        } else if (error.status >= 500) {
          errorMessage = 'COMMON.SERVER_ERROR';
        } else if (error.status === 400 && Array.isArray(messageFromBody)) {
          errorMessage = messageFromBody.join(', ');
        } else if (error.status === 409 || dbCode === '23505') {
          errorMessage =
            typeof detail === 'string'
              ? detail
              : 'Ya existe un registro con este dato único.';
        } else if (
          typeof messageFromBody === 'string' &&
          messageFromBody.length > 0
        ) {
          errorMessage = messageFromBody;
        } else {
          // Generic fallback
          errorMessage = 'COMMON.UNKNOWN_ERROR';
        }
      }

      toastService.showError(errorMessage);
      return throwError(() => error);
    }),
  );
};
