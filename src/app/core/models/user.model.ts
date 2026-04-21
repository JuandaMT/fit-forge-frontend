export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  heightCm: number;
  currentWeightKg: number;
  goalType: GoalType;
  assignedRoutineId: number | null;
  assignedDietId: number | null;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export type GoalType = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
