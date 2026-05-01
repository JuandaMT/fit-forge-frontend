export interface Diet {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  totalCalories: number;
  category?: string;
}
