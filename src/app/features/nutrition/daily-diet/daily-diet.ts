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

  addFood(): void {
    const foodName = window.prompt('Introduce el nombre del alimento:');
    if (foodName && this.progress()) {
      const current = this.progress()!;
      // Simple mock: add to the first meal
      if (current.meals && current.meals.length > 0) {
        if (!current.meals[0].ingredients) {
          current.meals[0].ingredients = [];
        }
        current.meals[0].ingredients.push({
          id: Math.random(),
          name: foodName,
          amount: '100g',
          calories: 150,
        });
        current.consumedCalories += 150;
        this.progress.set({ ...current });
      }
    }
  }

  completeDay(): void {
    if (window.confirm('¿Estás seguro de que quieres cerrar el día?')) {
      if (this.progress()) {
        const current = this.progress()!;
        current.meals.forEach((m) => (m.completed = true));
        this.progress.set({ ...current });
        alert('¡Día completado con éxito! Has alcanzado tus objetivos.');
      }
    }
  }
}
