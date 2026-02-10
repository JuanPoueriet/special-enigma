import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export class AsyncValidators {
  static createEmailValidator(http: HttpClient, apiUrl: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return timer(500).pipe(
        switchMap(() => http.head(`${apiUrl}/common/users/exists`, {
          params: { email: control.value },
          observe: 'response'
        })),
        map(response => response.ok ? { emailExists: true } : null),
        catchError(error => {
          if (error.status === 404) {
             return of(null);
          }
          return of(null);
        })
      );
    };
  }

  static createTaxIdValidator(http: HttpClient, apiUrl: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
       if (!control.value) {
        return of(null);
      }
      return timer(500).pipe(
        switchMap(() => http.head(`${apiUrl}/common/organizations/exists`, {
          params: { taxId: control.value },
          observe: 'response'
        })),
        map(response => response.ok ? { taxIdExists: true } : null),
        catchError(error => {
           if (error.status === 404) {
             return of(null);
          }
          return of(null);
        })
      );
    };
  }
}
