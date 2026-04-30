import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { StatTile, SectionCard, MacroBar, StarRating, Badge } from '../../../shared/components';

@Component({
  selector: 'app-dashboard-page',
  imports: [DecimalPipe, RouterLink, StatTile, SectionCard, MacroBar, StarRating, Badge],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private readonly ds = inject(DashboardService);

  readonly greeting = this.ds.getGreeting();
  readonly kpis = this.ds.getKpis();
  readonly weekly = this.ds.getWeeklyActivity();
  readonly macros = this.ds.getDailyMacros();
  readonly session = this.ds.getLastSession();
  readonly recommendations = this.ds.getRecommendations();
  readonly plan = this.ds.getActivePlan();
}
