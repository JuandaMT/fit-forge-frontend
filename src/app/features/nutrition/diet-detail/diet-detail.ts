import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DietService } from '../services/diet.service';
import { Diet } from '../models/diet.model';

interface FoodItem {
  name: string;
  amount: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  dotClass: string;
}

interface MealPlan {
  name: string;
  time: string;
  totalCalories: number;
  foods: FoodItem[];
}

const WEEKLY_PLAN: MealPlan[] = [
  {
    name: 'Desayuno',
    time: '08:00 — 09:00',
    totalCalories: 487,
    foods: [
      {
        name: 'Avena con leche',
        amount: '80g',
        kcal: 312,
        protein: 12,
        carbs: 52,
        fat: 6,
        dotClass: 'dot-yellow',
      },
      {
        name: 'Plátano',
        amount: '120g',
        kcal: 107,
        protein: 1,
        carbs: 27,
        fat: 0,
        dotClass: 'dot-green',
      },
      {
        name: 'Huevos revueltos',
        amount: '2 uds',
        kcal: 143,
        protein: 12,
        carbs: 1,
        fat: 10,
        dotClass: 'dot-green',
      },
    ],
  },
  {
    name: 'Almuerzo',
    time: '13:00 — 14:00',
    totalCalories: 724,
    foods: [
      {
        name: 'Pechuga de pollo',
        amount: '180g',
        kcal: 297,
        protein: 55,
        carbs: 0,
        fat: 6,
        dotClass: 'dot-green',
      },
      {
        name: 'Arroz integral',
        amount: '150g',
        kcal: 195,
        protein: 4,
        carbs: 42,
        fat: 2,
        dotClass: 'dot-yellow',
      },
      {
        name: 'Brócoli al vapor',
        amount: '200g',
        kcal: 68,
        protein: 6,
        carbs: 12,
        fat: 1,
        dotClass: 'dot-green',
      },
      {
        name: 'Aceite de oliva',
        amount: '15ml',
        kcal: 132,
        protein: 0,
        carbs: 0,
        fat: 15,
        dotClass: 'dot-yellow',
      },
    ],
  },
  {
    name: 'Merienda',
    time: '17:00 — 17:30',
    totalCalories: 280,
    foods: [
      {
        name: 'Yogur griego',
        amount: '200g',
        kcal: 130,
        protein: 17,
        carbs: 8,
        fat: 4,
        dotClass: 'dot-green',
      },
      {
        name: 'Frutos secos mix',
        amount: '30g',
        kcal: 180,
        protein: 5,
        carbs: 6,
        fat: 15,
        dotClass: 'dot-yellow',
      },
    ],
  },
  {
    name: 'Cena',
    time: '21:00 — 22:00',
    totalCalories: 620,
    foods: [
      {
        name: 'Salmón al horno',
        amount: '200g',
        kcal: 416,
        protein: 44,
        carbs: 0,
        fat: 26,
        dotClass: 'dot-green',
      },
      {
        name: 'Ensalada verde',
        amount: '150g',
        kcal: 30,
        protein: 2,
        carbs: 5,
        fat: 0,
        dotClass: 'dot-green',
      },
      {
        name: 'Patata al horno',
        amount: '150g',
        kcal: 117,
        protein: 3,
        carbs: 27,
        fat: 0,
        dotClass: 'dot-yellow',
      },
    ],
  },
];

@Component({
  selector: 'app-diet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diet-detail.html',
  styleUrls: ['./diet-detail.scss'],
})
export class DietDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly dietService = inject(DietService);

  diet = signal<Diet | null>(null);
  loading = signal<boolean>(true);
  selectedDay = signal<string>('Lunes');

  readonly days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadDiet(id);
      }
    });
  }

  loadDiet(id: string): void {
    this.loading.set(true);
    const dietId = isNaN(Number(id)) ? id : Number(id);

    this.dietService.getDietById(dietId).subscribe({
      next: (data) => {
        this.diet.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching diet details', err);
        this.loading.set(false);
      },
    });
  }

  getMealsForDay(): MealPlan[] {
    // En datos reales, cada día podría tener un plan diferente.
    // Con mock, todos los días comparten el mismo plan de comidas.
    return WEEKLY_PLAN;
  }

  goBack(): void {
    this.location.back();
  }

  selectDiet(): void {
    console.log('Dieta asignada:', this.diet()?.title);
  }
}
