import { Component, input } from '@angular/core';

@Component({
  selector: 'ff-stat-tile',
  template: `
    <div class="ff-stat-tile">
      <div class="label">{{ label() }}</div>
      <div class="value" [attr.data-tone]="tone()">
        {{ value() }}
        @if (unit()) { <span class="unit">{{ unit() }}</span> }
      </div>
      @if (hint()) {
        <div class="hint">{{ hint() }}</div>
      }
    </div>
  `,
  styles: [`
    .ff-stat-tile {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1rem 1.15rem;
    }
    .label {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-bottom: 0.5rem;
    }
    .value {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.75rem;
      color: var(--color-text);
      line-height: 1;
      display: flex;
      align-items: baseline;
      gap: 0.25rem;

      &[data-tone="primary"] { color: var(--color-primary); }
      &[data-tone="danger"]  { color: var(--color-danger); }
      &[data-tone="stars"]   { color: var(--color-stars); }
      &[data-tone="info"]    { color: var(--color-info); }
    }
    .unit {
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--color-text-muted);
    }
    .hint {
      font-size: 0.72rem;
      color: var(--color-text-muted);
      margin-top: 0.4rem;
    }
  `],
})
export class StatTile {
  label = input.required<string>();
  value = input.required<string | number>();
  unit = input<string>('');
  hint = input<string>('');
  tone = input<'default' | 'primary' | 'danger' | 'stars' | 'info'>('default');
}
