import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService, JwtUtilsService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authService = inject(AuthService);
    const jwtUtilsService = inject(JwtUtilsService)

    let newReq = req.clone();

    if (
      jwtUtilsService.accessToken &&
      !jwtUtilsService.isTokenExpired(jwtUtilsService.accessToken)
    ) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + jwtUtilsService.accessToken
        ),
      });
    }

    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          authService.signOut();

          // Reload the app
          location.reload();
        }

        return throwError(error);
      })
    );
  }
}