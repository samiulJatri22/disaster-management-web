import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService, JwtUtilsService } from '../services';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const jwtUtilsService = inject(JwtUtilsService);

  let newReq = req;
  if (
    jwtUtilsService.accessToken &&
    !jwtUtilsService.isTokenExpired(jwtUtilsService.accessToken)
  ) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtUtilsService.accessToken}`,
      },
    });
  }

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.signOut();
        location.reload(); // Reload the app
      }
      return throwError(() => error);
    })
  );
};
