import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SystemComponent } from './system/system.component';
import { DashboardComponent } from './system/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'system',
    component: SystemComponent,
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  { path: '**', redirectTo: '' },
];
