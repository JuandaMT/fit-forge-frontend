import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'ff-macro-ring',
  template: `
    <div class="ff-macro-ring" [style.--size.px]="size()" [style.--stroke.px]="stroke()">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle
          class="track"
          cx="50"
          cy="50"
          [attr.r]="radius()"
          [attr.stroke-width]="strokePct()"
          fill="none"
        />
        <circle
          class="progress"
          cx="50"
          cy="50"
          [attr.r]="radius()"
          [attr.stroke-width]="strokePct()"
          fill="none"
          [attr.stroke-dasharray]="circumference()"
          [attr.stroke-dashoffset]="offset()"
        />
      </svg>
      <div class="label">
        <div class="value">{{ value() }}</div>
        <div class="caption">{{ caption() }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .ff-macro-ring {
        position: relative;
        width: var(--size);
        height: var(--size);
        display: inline-block;
      }
      svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .track {
        stroke: var(--color-surface-2);
      }
      .progress {
        stroke: var(--color-primary);
        stroke-linecap: round;
        transition: stroke-dashoffset 0.4s;
      }
      .label {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .value {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 1.35rem;
        color: var(--color-text);
        line-height: 1;
      }
      .caption {
        font-size: 0.65rem;
        color: var(--color-text-muted);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-top: 0.25rem;
      }
    `,
  ],
})
export class MacroRing {
  percent = input.required<number>();
  value = input.required<string>();
  caption = input<string>('');
  size = input<number>(120);
  stroke = input<number>(8);

  radius = computed(() => 50 - this.strokePct() / 2);
  strokePct = computed(() => (this.stroke() / this.size()) * 100);
  circumference = computed(() => 2 * Math.PI * this.radius());
  offset = computed(() => {
    const pct = Math.max(0, Math.min(100, this.percent()));
    return this.circumference() * (1 - pct / 100);
  });
}
