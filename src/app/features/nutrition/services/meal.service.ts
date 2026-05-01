import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DailyNutritionProgress, Meal } from '../models/meal.model';

const MOCK_DAILY_PROGRESS: DailyNutritionProgress = {
  date: new Date().toISOString().split('T')[0],
  targetCalories: 2400,
  consumedCalories: 1840,
  targetProtein: 200,
  consumedProtein: 156,
  targetCarbs: 300,
  consumedCarbs: 210,
  targetFat: 80,
  consumedFat: 71,
  meals: [
    {
      id: 1,
      type: 'breakfast',
      name: 'Desayuno',
      time: '08:30',
      calories: 486,
      protein: 25,
      carbs: 60,
      fat: 15,
      completed: true,
      ingredients: [
        { id: 1, name: 'Avena con leche', amount: '80g', calories: 312 },
        { id: 2, name: 'Plátano', amount: '120g', calories: 107 },
        { id: 3, name: 'Huevos revueltos', amount: '2 uds', calories: 143 },
      ],
    } as Meal,
    {
      id: 2,
      type: 'lunch',
      name: 'Almuerzo',
      time: '13:00',
      calories: 724,
      protein: 45,
      carbs: 85,
      fat: 22,
      completed: true,
      ingredients: [
        { id: 4, name: 'Pechuga de pollo', amount: '180g', calories: 297 },
        { id: 5, name: 'Arroz integral', amount: '150g', calories: 195 },
        { id: 6, name: 'Brócoli al vapor', amount: '200g', calories: 68 },
        { id: 7, name: 'Aceite de oliva', amount: '15ml', calories: 132 },
      ],
    } as Meal,
    {
      id: 3,
      type: 'snack',
      name: 'Merienda',
      time: '17:00',
      calories: 280,
      protein: 20,
      carbs: 30,
      fat: 10,
      completed: true,
      ingredients: [
        { id: 8, name: 'Yogur griego', amount: '1 ud', calories: 120 },
        { id: 9, name: 'Nueces', amount: '30g', calories: 160 },
      ],
    } as Meal,
    {
      id: 4,
      type: 'dinner',
      name: 'Cena',
      time: '21:00',
      calories: 560,
      protein: 40,
      carbs: 45,
      fat: 18,
      completed: false,
      ingredients: [],
    } as Meal,
  ],
};

@Injectable({
  providedIn: 'root',
})
export class MealService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDailyProgress(date?: string): Observable<DailyNutritionProgress> {
    return of(MOCK_DAILY_PROGRESS).pipe(delay(500));
  }

  markMealAsCompleted(mealId: string | number, completed: boolean): Observable<Meal> {
    const meal = MOCK_DAILY_PROGRESS.meals.find((m) => m.id === mealId)!;
    meal.completed = completed;
    return of({ ...meal }).pipe(delay(300));
  }
}
