import { Injectable, signal } from '@angular/core';
import {
  KpiItem,
  WeeklyActivity,
  DailyMacros,
  RecentSession,
  AiRecommendation,
  PlanInfo,
  GreetingData,
} from '../models/dashboard.models';

// ─────────────────────────────────────────────────────────────
// FITFORGE — Dashboard Service (mock data)
//
// Returns static mock data via Angular Signals.
// Replace each method body with HttpClient calls when the
// backend is deployed — the return types stay the same.
// ─────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // ── Greeting ─────────────────────────────────────────────
  getGreeting() {
    return signal<GreetingData>({
      userName: 'Juan David',
      dateLabel: this.buildDateLabel(),
      weekNumber: 6,
    });
  }

  // ── KPIs ─────────────────────────────────────────────────
  getKpis() {
    return signal<KpiItem[]>([
      {
        label: 'Peso actual',
        value: '83.5',
        unit: 'kg',
        hint: '↓ 1.5kg desde el inicio',
        tone: 'default',
      },
      {
        label: 'Kcal hoy',
        value: '1.840',
        unit: 'kcal',
        hint: 'Objetivo: 2.400 kcal',
        tone: 'default',
      },
      {
        label: 'Sesiones totales',
        value: '18',
        unit: '',
        hint: '↑ 4 esta semana',
        tone: 'default',
      },
      {
        label: 'Adherencia',
        value: '86',
        unit: '%',
        hint: '↑ 12% vs semana ant.',
        tone: 'primary',
      },
    ]);
  }

  // ── Weekly activity ──────────────────────────────────────
  getWeeklyActivity() {
    return signal<WeeklyActivity>({
      days: [
        { day: 'L', percent: 90, completed: true },
        { day: 'M', percent: 70, completed: true },
        { day: 'X', percent: 0, completed: false },
        { day: 'J', percent: 85, completed: true },
        { day: 'V', percent: 95, completed: true },
        { day: 'S', percent: 60, completed: true },
        { day: 'D', percent: 0, completed: false },
      ],
      completedCount: 5,
      totalCount: 6,
      changePercent: 83,
    });
  }

  // ── Daily macros ─────────────────────────────────────────
  getDailyMacros() {
    return signal<DailyMacros>({
      macros: [
        { name: 'Proteína', current: 156, target: 200, unit: 'g', color: 'primary' },
        { name: 'Carbohidratos', current: 210, target: 300, unit: 'g', color: 'stars' },
        { name: 'Grasas', current: 71, target: 80, unit: 'g', color: 'danger' },
        { name: 'Fibra', current: 12, target: 30, unit: 'g', color: 'info' },
      ],
      caloriesConsumed: 1840,
      caloriesTarget: 2400,
    });
  }

  // ── Last session ─────────────────────────────────────────
  getLastSession() {
    return signal<RecentSession>({
      id: 1,
      name: 'Tren superior',
      exercises: [
        {
          name: 'Press de banca',
          sets: 4,
          reps: 10,
          weight: '70kg',
          rating: 5,
          difficulty: 'easy',
          difficultyLabel: 'Fácil',
        },
        {
          name: 'Press militar',
          sets: 4,
          reps: 8,
          weight: '45kg',
          rating: 4,
          difficulty: 'mid',
          difficultyLabel: 'Medio',
        },
        {
          name: 'Fondos en paralelas',
          sets: 3,
          reps: 12,
          weight: 'Peso corporal',
          rating: 3,
          difficulty: 'hard',
          difficultyLabel: 'Duro',
        },
        {
          name: 'Remo con barra',
          sets: 4,
          reps: 10,
          weight: '60kg',
          rating: 4,
          difficulty: 'mid',
          difficultyLabel: 'Medio',
        },
      ],
    });
  }

  // ── AI recommendations ───────────────────────────────────
  getRecommendations() {
    return signal<AiRecommendation[]>([
      {
        icon: '📈',
        text: 'Sube 2.5kg en press banca — llevas 3 sesiones con dificultad baja',
        variant: 'easy',
      },
      {
        icon: '⚠️',
        text: 'Fondos muy duros — considera reducir series a 2×10 la próxima sesión',
        variant: 'hard',
      },
      {
        icon: '🍽️',
        text: 'Te faltan 560 kcal para el objetivo de hoy — añade una comida',
        variant: 'ai',
      },
    ]);
  }

  // ── Active plan ──────────────────────────────────────────
  getActivePlan() {
    return signal<PlanInfo>({
      routineName: 'Full Body',
      routineLevel: 'Intermedio',
      dietName: 'Superávit',
      dietCalories: 2400,
    });
  }

  // ── Helpers ──────────────────────────────────────────────
  private buildDateLabel(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    const formatted = now.toLocaleDateString('es-ES', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}
