import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../../shared/components/badge/badge';
import { StarRating } from '../../../shared/components/star-rating/star-rating';
import { MuscleGroup } from '../models/workouts.models';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-exercise-catalog',
  imports: [RouterLink, Badge, StarRating],
  templateUrl: './exercise-catalog.html',
  styleUrl: './exercise-catalog.scss',
})
export class ExerciseCatalog {
  private readonly ws = inject(WorkoutsService);
  readonly exercises = this.ws.getExercises();

  readonly search = signal('');
  readonly muscleFilter = signal<MuscleGroup | 'all'>('all');

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    const muscle = this.muscleFilter();
    return this.exercises().filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q)) && (muscle === 'all' || e.muscleGroup === muscle),
    );
  });

  readonly muscleGroups: { label: string; value: MuscleGroup | 'all' }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Pecho', value: 'pecho' },
    { label: 'Espalda', value: 'espalda' },
    { label: 'Hombros', value: 'hombros' },
    { label: 'Bíceps', value: 'biceps' },
    { label: 'Tríceps', value: 'triceps' },
    { label: 'Piernas', value: 'piernas' },
    { label: 'Abdomen', value: 'abdomen' },
    { label: 'Cardio', value: 'cardio' },
  ];

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
