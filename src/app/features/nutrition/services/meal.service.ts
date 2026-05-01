import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DailyNutritionProgress, Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/meals`;

  getDailyProgress(date?: string): Observable<DailyNutritionProgress> {
    const queryParam = date ? `?date=${date}` : '';
    return this.http.get<DailyNutritionProgress>(`${this.apiUrl}/daily-progress${queryParam}`);
  }

  markMealAsCompleted(mealId: string | number, completed: boolean): Observable<Meal> {
    return this.http.patch<Meal>(`${this.apiUrl}/${mealId}/status`, { completed });
  }
}
