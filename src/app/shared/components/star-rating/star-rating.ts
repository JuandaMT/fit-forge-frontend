import { Component, input, output, signal, computed } from '@angular/core';

@Component({
  selector: 'ff-star-rating',
  template: `
    <span
      class="ff-star-rating"
      [class.interactive]="interactive()"
      [attr.aria-label]="value() + ' de ' + max()"
    >
      @for (i of stars(); track i) {
        <span
          class="star"
          [class.filled]="i <= displayValue()"
          [class.hovered]="interactive() && i <= hovered()"
          [attr.role]="interactive() ? 'button' : null"
          [attr.tabindex]="interactive() ? 0 : null"
          [attr.aria-label]="interactive() ? i + ' estrella' + (i > 1 ? 's' : '') : null"
          (mouseenter)="interactive() && hovered.set(i)"
          (mouseleave)="interactive() && hovered.set(0)"
          (click)="interactive() && onSelect(i)"
          (keydown.enter)="interactive() && onSelect(i)"
          (keydown.space)="interactive() && onSelect(i)"
          >★</span
        >
      }
      @if (showValue()) {
        <span class="value">{{ value().toFixed(1) }}</span>
      }
    </span>
  `,
  styles: [
    `
      .ff-star-rating {
        display: inline-flex;
        align-items: center;
        gap: 0.1rem;
        font-size: 1rem;
        line-height: 1;
      }
      .star {
        color: rgba(255, 255, 255, 0.18);
        transition:
          color 0.1s,
          transform 0.1s;
        &.filled {
          color: var(--color-stars);
        }
        &.hovered {
          color: var(--color-stars);
          opacity: 0.7;
        }
      }
      .interactive {
        cursor: pointer;
        .star:hover,
        .star.hovered {
          transform: scale(1.2);
        }
      }
      .value {
        margin-left: 0.4rem;
        font-size: 0.78rem;
        color: var(--color-text-muted);
      }
    `,
  ],
})
export class StarRating {
  value = input.required<number>();
  max = input<number>(5);
  interactive = input<boolean>(false);
  showValue = input<boolean>(false);

  valueChange = output<number>();

  hovered = signal(0);

  stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));
  displayValue = computed(() => this.hovered() || this.value());

  onSelect(i: number) {
    this.valueChange.emit(i);
    this.hovered.set(0);
  }
}
