import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../../shared/components/badge/badge';
import { SectionCard } from '../../../shared/components/section-card/section-card';
import { StarRating } from '../../../shared/components/star-rating/star-rating';
import { StatTile } from '../../../shared/components/stat-tile/stat-tile';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-session-summary',
  imports: [RouterLink, StatTile, SectionCard, Badge, StarRating],
  templateUrl: './session-summary.html',
  styleUrl: './session-summary.scss',
})
export class SessionSummary {
  readonly id = input<string>('1');

  private readonly ws = inject(WorkoutsService);
  readonly summary = this.ws.getSessionSummary(this.id());

  readonly totalSeries = computed(() =>
    this.summary().exercises.reduce((acc, ex) => acc + ex.sets.length, 0),
  );
}
