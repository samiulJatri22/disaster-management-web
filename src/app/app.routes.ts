import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SystemComponent } from './system/system.component';
import { DashboardComponent } from './system/dashboard/dashboard.component';
import { ReliefComponent } from './system/relief/relief.component';
import { CrisisComponent } from './system/crisis/crisis.component';
import { DonationComponent } from './system/donation/donation.component';
import { VolunteerComponent } from './system/volunteer/volunteer.component';
import { AdminComponent } from './system/admin/admin.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'system',
    component: SystemComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'relief', component: ReliefComponent },
      { path: 'crisis', component: CrisisComponent },
      { path: 'donation', component: DonationComponent },
      { path: 'volunteer', component: VolunteerComponent },
      { path: 'admin', component: AdminComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
