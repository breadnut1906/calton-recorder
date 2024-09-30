import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [ authGuard ],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage),
      },
      {
        path: 'devices',
        loadComponent: () => import('./pages/devices/devices.page').then( m => m.DevicesPage)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/page-not-found/page-not-found.page').then( m => m.PageNotFoundPage)
      },
    ]
  },
];
