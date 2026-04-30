import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  KpiItem,
  WeeklyActivity,
  DailyMacros,
  RecentSession,
  AiRecommendation,
  PlanInfo,
  GreetingData,
} from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // ── Signals Internas con valores por defecto (Mock / Fallback) ──
  private greetingSig = signal<GreetingData>({
    userName: 'Cargando...',
    dateLabel: this.buildDateLabel(),
    weekNumber: 1,
  });

  private kpisSig = signal<KpiItem[]>([
    { label: 'Peso actual', value: '--', unit: 'kg', hint: 'Buscando...', tone: 'default' },
    { label: 'Kcal hoy', value: '--', unit: 'kcal', hint: 'Buscando...', tone: 'default' },
    { label: 'Sesiones totales', value: '--', unit: '', hint: 'Buscando...', tone: 'default' },
    { label: 'Adherencia', value: '--', unit: '%', hint: 'Buscando...', tone: 'primary' },
  ]);

  private weeklySig = signal<WeeklyActivity>({
    days: [],
    completedCount: 0,
    totalCount: 0,
    changePercent: 0,
  });

  private macrosSig = signal<DailyMacros>({
    macros: [
      { name: 'Proteína', current: 0, target: 0, unit: 'g', color: 'primary' },
      { name: 'Carbohidratos', current: 0, target: 0, unit: 'g', color: 'stars' },
      { name: 'Grasas', current: 0, target: 0, unit: 'g', color: 'danger' },
    ],
    caloriesConsumed: 0,
    caloriesTarget: 0,
  });

  private sessionSig = signal<RecentSession>({
    id: 0,
    name: 'Cargando última sesión...',
    exercises: [],
  });

  private recommendationsSig = signal<AiRecommendation[]>([
    { icon: '🤖', text: 'Esperando datos de la IA...', variant: 'ai' },
  ]);

  private planSig = signal<PlanInfo>({
    routineName: 'Cargando...',
    routineLevel: '-',
    dietName: 'Cargando...',
    dietCalories: 0,
  });

  constructor() {
    // Al instanciar, intentamos cargar los datos reales
    this.loadRealData();
  }

  // ── Métodos Públicos (devuelven la misma referencia de señal siempre) ──
  getGreeting() {
    return this.greetingSig;
  }
  getKpis() {
    return this.kpisSig;
  }
  getWeeklyActivity() {
    return this.weeklySig;
  }
  getDailyMacros() {
    return this.macrosSig;
  }
  getLastSession() {
    return this.sessionSig;
  }
  getRecommendations() {
    return this.recommendationsSig;
  }
  getActivePlan() {
    return this.planSig;
  }

  // ── Helpers & Lógica HTTP ──────────────────────────────────────────────
  private buildDateLabel(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const formatted = now.toLocaleDateString('es-ES', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  private loadRealData() {
    // 1. Cargar datos del usuario
    this.http
      .get<any>(`${this.apiUrl}/users/me`)
      .pipe(
        catchError((err) => {
          console.error('Error al cargar datos reales del usuario:', err);
          return of(null);
        }),
      )
      .subscribe((user) => {
        if (!user) return; // Falló por CORS u otro error

        this.greetingSig.update((g) => ({ ...g, userName: user.firstName || user.username }));

        this.kpisSig.update((kpis) => {
          const newKpis = [...kpis];
          newKpis[0] = {
            ...newKpis[0],
            value: user.currentWeightKg || '--',
            hint: 'Último pesaje',
          };
          newKpis[1] = {
            ...newKpis[1],
            value: user.dailyKcal || '--',
            hint: 'Objetivo de mantenimiento',
          };
          return newKpis;
        });

        this.macrosSig.update((m) => ({
          ...m,
          caloriesTarget: user.dailyKcal || 2000,
          macros: [
            {
              name: 'Proteína',
              current: 0,
              target: user.dailyProteinG || 150,
              unit: 'g',
              color: 'primary',
            },
            {
              name: 'Carbohidratos',
              current: 0,
              target: user.dailyCarbsG || 200,
              unit: 'g',
              color: 'stars',
            },
            {
              name: 'Grasas',
              current: 0,
              target: user.dailyFatG || 70,
              unit: 'g',
              color: 'danger',
            },
          ],
        }));

        this.planSig.update((p) => ({
          ...p,
          dietName:
            user.goalType === 'weight_loss'
              ? 'Definición'
              : user.goalType === 'muscle_gain'
                ? 'Volumen'
                : 'Mantenimiento',
          dietCalories: user.dailyKcal || 0,
        }));
      });

    // 2. Cargar historial de workouts para sacar total de sesiones
    this.http
      .get<any>(`${this.apiUrl}/workouts?limit=1`)
      .pipe(catchError(() => of(null)))
      .subscribe((res) => {
        if (!res) return;
        this.kpisSig.update((kpis) => {
          const newKpis = [...kpis];
          newKpis[2] = {
            ...newKpis[2],
            value: res.total?.toString() || '0',
            hint: 'Historial total',
          };
          return newKpis;
        });

        if (res.data && res.data.length > 0) {
          const last = res.data[0];
          this.sessionSig.update((s) => ({
            ...s,
            name: `Sesión del ${new Date(last.startedAt).toLocaleDateString()}`,
          }));
        }
      });
  }
}
