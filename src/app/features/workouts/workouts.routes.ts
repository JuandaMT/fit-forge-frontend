import { Routes } from '@angular/router';

export const WORKOUTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./routine-catalog/routine-catalog').then((m) => m.RoutineCatalog),
  },
  {
    path: 'routines/:id',
    loadComponent: () => import('./routine-detail/routine-detail').then((m) => m.RoutineDetail),
  },
  {
    path: 'exercises',
    loadComponent: () =>
      import('./exercise-catalog/exercise-catalog').then((m) => m.ExerciseCatalog),
  },
  {
    path: 'exercises/:id',
    loadComponent: () => import('./exercise-detail/exercise-detail').then((m) => m.ExerciseDetail),
  },
  {
    path: 'sessions/new',
    loadComponent: () => import('./active-session/active-session').then((m) => m.ActiveSession),
  },
  {
    path: 'sessions/:id/summary',
    loadComponent: () => import('./session-summary/session-summary').then((m) => m.SessionSummary),
  },
  {
    path: 'history',
    loadComponent: () => import('./session-history/session-history').then((m) => m.SessionHistory),
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./progress-comparison/progress-comparison').then((m) => m.ProgressComparison),
  },
];
