import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MealService } from '../services/meal.service';
import { DailyNutritionProgress } from '../models/meal.model';

@Component({
  selector: 'app-daily-diet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './daily-diet.html',
  styleUrls: ['./daily-diet.scss'],
})
export class DailyDiet implements OnInit {
  private readonly mealService = inject(MealService);

  progress = signal<DailyNutritionProgress | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadDailyProgress();
  }

  loadDailyProgress(): void {
    this.loading.set(true);
    // Format date as YYYY-MM-DD for the API
    const today = new Date().toISOString().split('T')[0];

    this.mealService.getDailyProgress(today).subscribe({
      next: (data) => {
        this.progress.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching daily progress', err);
        // Do not use mocks. Just show the error and handle empty state gracefully.
        this.error.set('No se pudo cargar el progreso diario. Comprueba tu conexión al servidor.');
        this.progress.set(null);
        this.loading.set(false);
      },
    });
  }

  getCompletedMealsCount(): number {
    const data = this.progress();
    if (!data || !data.meals) return 0;
    return data.meals.filter((m) => m.completed).length;
  }
}
