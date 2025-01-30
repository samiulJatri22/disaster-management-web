import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SystemComponent } from './system/system.component';
import { DashboardComponent } from './system/dashboard/dashboard.component';
import { ReliefComponent } from './system/relief/relief.component';
import { CrisisComponent } from './system/crisis/crisis.component';
import { DonationComponent } from './system/donation/donation.component';
import { VolunteerComponent } from './system/volunteer/volunteer.component';
import { AdminComponent } from './system/admin/admin.component';
import { LoginComponent } from './landing/login/login.component';
import { SelfRegistrationComponent } from './landing/self-registration/self-registration.component';
import { SelfDonationComponent } from './landing/donation/donation.component';
import { AuthGuard, NoAuthGuard } from './common';

export const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'volunteer-registration',
    component: SelfRegistrationComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'donation',
    component: SelfDonationComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'system',
    component: SystemComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { animation: 'DashboardPage' },
      },
      {
        path: 'relief',
        component: ReliefComponent,
        data: { animation: 'ReliefPage' },
      },
      {
        path: 'crisis',
        component: CrisisComponent,
        data: { animation: 'CrisisPage' },
      },
      {
        path: 'donation',
        component: DonationComponent,
        data: { animation: 'DonationPage' },
      },
      {
        path: 'volunteer',
        component: VolunteerComponent,
        data: { animation: 'VolunteerPage' },
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { animation: 'AdminPage' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
