export interface Diet {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  totalCalories: number;
  category?: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  mealsList?: string[];
}
