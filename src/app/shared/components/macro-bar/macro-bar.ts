import { Component, computed, input } from '@angular/core';

export type MacroColor = 'primary' | 'stars' | 'danger' | 'info';

@Component({
  selector: 'ff-macro-bar',
  template: `
    <div class="ff-macro-bar">
      <span class="name">{{ name() }}</span>
      <div class="track">
        <div class="fill" [style.width.%]="percent()" [attr.data-color]="color()"></div>
      </div>
      <span class="value">{{ valueLabel() }}</span>
    </div>
  `,
  styles: [`
    .ff-macro-bar {
      display: grid;
      grid-template-columns: 90px 1fr auto;
      align-items: center;
      gap: 0.75rem;
      padding: 0.35rem 0;
    }
    .name {
      font-size: 0.82rem;
      color: var(--color-text);
    }
    .track {
      height: 6px;
      background: var(--color-surface-2);
      border-radius: 999px;
      overflow: hidden;
    }
    .fill {
      height: 100%;
      border-radius: 999px;
      transition: width .3s;

      &[data-color="primary"] { background: var(--color-primary); }
      &[data-color="stars"]   { background: var(--color-stars); }
      &[data-color="danger"]  { background: var(--color-danger); }
      &[data-color="info"]    { background: var(--color-info); }
    }
    .value {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      min-width: 56px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
  `],
})
export class MacroBar {
  name = input.required<string>();
  current = input.required<number>();
  target = input<number | null>(null);
  unit = input<string>('g');
  color = input<MacroColor>('primary');

  percent = computed(() => {
    const t = this.target();
    if (!t || t <= 0) return 0;
    return Math.min(100, Math.round((this.current() / t) * 100));
  });

  valueLabel = computed(() => {
    const t = this.target();
    if (t != null) return `${this.current()}${this.unit()} / ${t}${this.unit()}`;
    return `${this.current()}${this.unit()}`;
  });
}
