import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Badge } from '../../../shared/components/badge/badge';
import { StarRating } from '../../../shared/components/star-rating/star-rating';
import { ActiveExercise, ActiveSet } from '../models/workouts.models';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-active-session',
  imports: [RouterLink, Badge, StarRating],
  templateUrl: './active-session.html',
  styleUrl: './active-session.scss',
})
export class ActiveSession {
  private readonly ws = inject(WorkoutsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  private readonly routineId = this.route.snapshot.queryParamMap.get('routineId');
  private readonly sessionData = this.ws.getActiveSession(this.routineId);

  readonly routineName = computed(() => this.sessionData().routineName);
  readonly exercises = signal<ActiveExercise[]>(structuredClone(this.sessionData().exercises));

  readonly elapsedSec = signal(0);

  readonly completedSets = computed(() =>
    this.exercises().reduce((acc, ex) => acc + ex.sets.filter((s) => s.done).length, 0),
  );

  readonly totalSets = computed(() =>
    this.exercises().reduce((acc, ex) => acc + ex.sets.length, 0),
  );

  readonly progress = computed(() =>
    this.totalSets() > 0 ? Math.round((this.completedSets() / this.totalSets()) * 100) : 0,
  );

  readonly elapsedLabel = computed(() => {
    const s = this.elapsedSec();
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  });

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

  constructor() {
    const interval = setInterval(() => this.elapsedSec.update((s) => s + 1), 1000);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  toggleSet(exIdx: number, setIdx: number) {
    this.exercises.update((exs) => {
      const clone = structuredClone(exs);
      clone[exIdx].sets[setIdx].done = !clone[exIdx].sets[setIdx].done;
      return clone;
    });
  }

  updateReps(exIdx: number, setIdx: number, value: string) {
    this.exercises.update((exs) => {
      const clone = structuredClone(exs);
      clone[exIdx].sets[setIdx].reps = value === '' ? null : Number(value);
      return clone;
    });
  }

  updateWeight(exIdx: number, setIdx: number, value: string) {
    this.exercises.update((exs) => {
      const clone = structuredClone(exs);
      clone[exIdx].sets[setIdx].weight = value;
      return clone;
    });
  }

  updateRating(exIdx: number, rating: number) {
    this.exercises.update((exs) => {
      const clone = structuredClone(exs);
      clone[exIdx].rating = rating;
      return clone;
    });
  }

  addSet(exIdx: number) {
    this.exercises.update((exs) => {
      const clone = structuredClone(exs);
      const sets = clone[exIdx].sets;
      const last = sets[sets.length - 1] as ActiveSet;
      sets.push({ setNumber: sets.length + 1, reps: null, weight: last.weight, done: false });
      return clone;
    });
  }

  allDone(ex: ActiveExercise) {
    return ex.sets.every((s) => s.done);
  }
}
