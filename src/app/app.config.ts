import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  AdminService,
  authInterceptor,
  AuthService,
  CrisisService,
  DonationService,
  JwtUtilsService,
  ReliefService,
} from './common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
    JwtUtilsService,
    AdminService,
    CrisisService,
    DonationService,
    ReliefService,
  ],
};
