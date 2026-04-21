import { Routes } from '@angular/router';

export const STATS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'workouts',
    pathMatch: 'full',
  },
  {
    path: 'workouts',
    loadComponent: () =>
      import('./workout-progress/workout-progress').then(m => m.WorkoutProgress),
  },
  {
    path: 'nutrition',
    loadComponent: () =>
      import('./nutritional-progress/nutritional-progress').then(m => m.NutritionalProgress),
  },
  {
    path: 'weight',
    loadComponent: () =>
      import('./body-weight/body-weight').then(m => m.BodyWeight),
  },
];
