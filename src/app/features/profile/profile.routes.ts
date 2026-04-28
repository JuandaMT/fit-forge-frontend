import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-profile/my-profile').then((m) => m.MyProfile),
  },
  {
    path: 'plan',
    loadComponent: () => import('./my-plan/my-plan').then((m) => m.MyPlan),
  },
];
