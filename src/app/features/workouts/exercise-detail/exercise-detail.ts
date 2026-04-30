import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../../shared/components/badge/badge';
import { MacroRing } from '../../../shared/components/macro-ring/macro-ring';
import { SectionCard } from '../../../shared/components/section-card/section-card';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-exercise-detail',
  imports: [RouterLink, Badge, SectionCard, MacroRing],
  templateUrl: './exercise-detail.html',
  styleUrl: './exercise-detail.scss',
})
export class ExerciseDetail {
  readonly id = input<string>('1');

  private readonly ws = inject(WorkoutsService);
  readonly exercise = this.ws.getExerciseById(this.id());

  readonly ratingPercent = computed(() => Math.round((this.exercise().avgRating / 5) * 100));

  readonly muscleLabel: Record<string, string> = {
    pecho: 'Pecho',
    espalda: 'Espalda',
    hombros: 'Hombros',
    biceps: 'Bíceps',
    triceps: 'Tríceps',
    piernas: 'Piernas',
    abdomen: 'Abdomen',
    cardio: 'Cardio',
  };

  diffLabel(d: string): string {
    const map: Record<string, string> = { easy: 'Fácil', mid: 'Medio', hard: 'Duro' };
    return map[d] ?? d;
  }
}
