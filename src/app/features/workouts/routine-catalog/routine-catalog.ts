import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, BadgeVariant } from '../../../shared/components/badge/badge';
import { StatTile } from '../../../shared/components/stat-tile/stat-tile';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-routine-catalog',
  imports: [RouterLink, Badge, StatTile],
  templateUrl: './routine-catalog.html',
  styleUrl: './routine-catalog.scss',
})
export class RoutineCatalog {
  private readonly ws = inject(WorkoutsService);

  readonly routines = this.ws.getRoutines();

  readonly search = signal('');
  readonly levelFilter = signal<BadgeVariant | null>(null);

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    const level = this.levelFilter();
    return this.routines().filter(
      (r) =>
        (!q || r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) &&
        (!level || r.level === level),
    );
  });

  readonly kpis = [
    { label: 'Rutinas disponibles', value: 6, unit: '', hint: '', tone: 'default' as const },
    {
      label: 'Completadas',
      value: 14,
      unit: 'sesiones',
      hint: 'Este mes',
      tone: 'primary' as const,
    },
    { label: 'Racha actual', value: 14, unit: 'días', hint: 'Sigue así', tone: 'stars' as const },
  ];

  readonly levels: { label: string; value: BadgeVariant }[] = [
    { label: 'Fácil', value: 'easy' },
    { label: 'Medio', value: 'mid' },
    { label: 'Duro', value: 'hard' },
  ];

  levelLabel(level: BadgeVariant): string {
    const map: Record<string, string> = { easy: 'Fácil', mid: 'Medio', hard: 'Duro' };
    return map[level] ?? level;
  }

  setLevel(level: BadgeVariant) {
    this.levelFilter.set(this.levelFilter() === level ? null : level);
  }
}
