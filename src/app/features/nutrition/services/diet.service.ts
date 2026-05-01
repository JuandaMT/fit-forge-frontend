import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Diet } from '../models/diet.model';

const MOCK_DIETS: Diet[] = [
  {
    id: 'current-assigned',
    title: 'Déficit moderado',
    description:
      'Plan estructurado con superávit calórico moderado para maximizar la ganancia muscular sin acumular grasa.',
    category: 'Ganancia muscular',
    tags: [],
    totalCalories: 2400,
    protein: 200,
    carbs: 300,
    fat: 80,
    mealsList: ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'],
  },
  {
    id: 2,
    title: 'Déficit calórico',
    description:
      'Déficit de 500 kcal diarias con alto contenido proteico para preservar la masa muscular durante la pérdida de peso.',
    category: 'Pérdida de peso',
    tags: [],
    totalCalories: 1800,
    protein: 180,
    carbs: 175,
    fat: 60,
    mealsList: ['Desayuno', 'Almuerzo', 'Cena'],
  },
  {
    id: 3,
    title: 'Equilibrio metabólico',
    description:
      'Ingesta calórica neutra para mantener el peso actual con distribución equilibrada de macronutrientes.',
    category: 'Mantenimiento',
    tags: [],
    totalCalories: 2100,
    protein: 160,
    carbs: 240,
    fat: 70,
    mealsList: ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'],
  },
  {
    id: 4,
    title: 'Carga de carbohidratos',
    description:
      'Alta densidad en carbohidratos complejos para maximizar el rendimiento en entrenamientos de larga duración.',
    category: 'Resistencia',
    tags: [],
    totalCalories: 2600,
    protein: 130,
    carbs: 390,
    fat: 58,
    mealsList: ['Desayuno', 'Media mañana', 'Almuerzo', 'Merienda', 'Cena'],
  },
  {
    id: 5,
    title: 'Keto adaptada',
    description:
      'Muy baja en carbohidratos y alta en grasas saludables. Promueve cetosis para quemar grasa como combustible.',
    category: 'Pérdida de peso',
    tags: [],
    totalCalories: 1900,
    protein: 140,
    carbs: 30,
    fat: 130,
    mealsList: ['Desayuno', 'Almuerzo', 'Cena'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class DietService {
  getDiets(): Observable<Diet[]> {
    // Usamos delay para simular carga de red
    return of(MOCK_DIETS).pipe(delay(600));
  }

  getDietById(id: string | number): Observable<Diet> {
    const diet = MOCK_DIETS.find((d) => d.id === id) || MOCK_DIETS[0];
    return of(diet).pipe(delay(400));
  }
}
