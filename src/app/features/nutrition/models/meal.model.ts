export interface Ingredient {
  id?: string | number;
  name: string;
  amount: string; // e.g., '100g', '2 tazas'
  calories?: number;
}

export interface Meal {
  id: string | number;
  type: string; // e.g., 'breakfast', 'lunch', 'snack', 'dinner'
  name: string;
  time?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients?: Ingredient[];
  completed?: boolean;
}

export interface DailyNutritionProgress {
  date: string; // ISO format or string representation
  targetCalories: number;
  consumedCalories: number;
  targetProtein: number;
  consumedProtein: number;
  targetCarbs: number;
  consumedCarbs: number;
  targetFat: number;
  consumedFat: number;
  meals: Meal[];
}
