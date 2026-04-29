// ─────────────────────────────────────────────────────────────
// FITFORGE — Dashboard domain models
// ─────────────────────────────────────────────────────────────

import { BadgeVariant, MacroColor } from '../../shared/components';

/** KPI card displayed in the top grid */
export interface KpiItem {
  label: string;
  value: string | number;
  unit: string;
  hint: string;
  tone: 'default' | 'primary' | 'danger' | 'stars' | 'info';
}

/** Single day in the weekly activity chart */
export interface WeeklyDay {
  day: string;
  /** 0–100 normalised bar height */
  percent: number;
  completed: boolean;
}

/** Weekly activity summary */
export interface WeeklyActivity {
  days: WeeklyDay[];
  completedCount: number;
  totalCount: number;
  changePercent: number;
}

/** A single macro nutrient row */
export interface MacroItem {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: MacroColor;
}

/** Daily macros overview */
export interface DailyMacros {
  macros: MacroItem[];
  caloriesConsumed: number;
  caloriesTarget: number;
}

/** An exercise within a session */
export interface SessionExercise {
  name: string;
  sets: number;
  reps: number;
  weight: string;
  rating: number;
  difficulty: BadgeVariant;
  difficultyLabel: string;
}

/** A workout session */
export interface RecentSession {
  id: number;
  name: string;
  exercises: SessionExercise[];
}

/** IA recommendation */
export interface AiRecommendation {
  icon: string;
  text: string;
  variant: BadgeVariant;
}

/** Active plan info */
export interface PlanInfo {
  routineName: string;
  routineLevel: string;
  dietName: string;
  dietCalories: number;
}

/** Greeting data for the dashboard header */
export interface GreetingData {
  userName: string;
  dateLabel: string;
  weekNumber: number;
}
