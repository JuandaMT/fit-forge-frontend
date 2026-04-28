import { Component, signal } from '@angular/core';
import { Badge } from '../../shared/components/badge/badge';
import { StarRating } from '../../shared/components/star-rating/star-rating';
import { MacroBar } from '../../shared/components/macro-bar/macro-bar';

@Component({
  selector: 'app-playground',
  imports: [Badge, StarRating, MacroBar],
  templateUrl: './playground.html',
  styleUrl:    './playground.scss',
})
export class Playground {
  // StarRating state
  ratingEnjoyment  = signal(3);
  ratingDifficulty = signal(4);
  ratingDisplay    = signal(4);

  // MacroBar state
  proteins = signal(120);
  carbs    = signal(180);
  fats     = signal(55);
}
