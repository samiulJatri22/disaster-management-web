import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

  if (token) {
    return true; // Allow access if token exists
  } else {
    router.navigate(['/login']); // Redirect to login if no token
    return false;
  }
};
