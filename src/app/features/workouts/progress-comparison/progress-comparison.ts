import { Component, computed, inject, signal } from '@angular/core';
import { MacroBar } from '../../../shared/components/macro-bar/macro-bar';
import { SectionCard } from '../../../shared/components/section-card/section-card';
import { StatTile } from '../../../shared/components/stat-tile/stat-tile';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-progress-comparison',
  imports: [StatTile, SectionCard, MacroBar],
  templateUrl: './progress-comparison.html',
  styleUrl: './progress-comparison.scss',
})
export class ProgressComparison {
  private readonly ws = inject(WorkoutsService);
  readonly kpis = this.ws.getProgressKpis();
  readonly progressData = this.ws.getExerciseProgress();

  readonly selectedId = signal('1');

  readonly selectedExercise = computed(
    () =>
      this.progressData().find((e) => e.exerciseId === this.selectedId()) ?? this.progressData()[0],
  );

  readonly chartMax = computed(() =>
    Math.max(...this.selectedExercise().records.map((r) => r.weight)),
  );

  readonly chartBars = computed(() =>
    this.selectedExercise().records.map((r) => ({
      ...r,
      percent: Math.round((r.weight / this.chartMax()) * 100),
    })),
  );
}
