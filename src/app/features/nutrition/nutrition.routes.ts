import { Routes } from '@angular/router';

export const NUTRITION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./daily-diet/daily-diet').then(m => m.DailyDiet),
  },
  {
    path: 'diets',
    loadComponent: () =>
      import('./diet-catalog/diet-catalog').then(m => m.DietCatalog),
  },
  {
    path: 'diets/:id',
    loadComponent: () =>
      import('./diet-detail/diet-detail').then(m => m.DietDetail),
  },
  {
    path: 'foods',
    loadComponent: () =>
      import('./food-search/food-search').then(m => m.FoodSearch),
  },
  {
    path: 'foods/:id',
    loadComponent: () =>
      import('./food-detail/food-detail').then(m => m.FoodDetail),
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./daily-summary/daily-summary').then(m => m.DailySummary),
  },
  {
    path: 'comparison',
    loadComponent: () =>
      import('./nutritional-comparison/nutritional-comparison').then(m => m.NutritionalComparison),
  },
];
