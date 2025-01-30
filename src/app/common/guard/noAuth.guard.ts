import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return true; // Allow access if no token exists
  } else {
    router.navigate(['system/dashboard']); // Redirect authenticated users
    return false;
  }
};
