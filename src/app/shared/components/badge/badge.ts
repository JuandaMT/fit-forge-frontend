import { Component, input } from '@angular/core';

export type BadgeVariant = 'easy' | 'mid' | 'hard' | 'ai' | 'neutral' | 'primary';

@Component({
  selector: 'ff-badge',
  template: `<span class="ff-badge" [attr.data-variant]="variant()"><ng-content /></span>`,
  styles: [
    `
      .ff-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.2rem 0.65rem;
        border-radius: var(--radius-pill);
        font-size: var(--text-label-size);
        font-weight: 600;
        letter-spacing: 0.04em;
        line-height: 1.4;
        white-space: nowrap;

        &[data-variant='easy'] {
          background: var(--color-easy-bg);
          color: var(--color-easy);
          border: 1px solid rgba(29, 158, 117, 0.25);
        }
        &[data-variant='mid'] {
          background: var(--color-mid-bg);
          color: var(--color-mid);
          border: 1px solid rgba(239, 159, 39, 0.25);
        }
        &[data-variant='hard'] {
          background: var(--color-hard-bg);
          color: var(--color-hard);
          border: 1px solid rgba(226, 75, 74, 0.25);
        }
        &[data-variant='ai'] {
          background: rgba(83, 74, 183, 0.12);
          color: var(--color-ai);
          border: 1px solid rgba(83, 74, 183, 0.25);
        }
        &[data-variant='primary'] {
          background: rgba(29, 158, 117, 0.18);
          color: var(--color-primary);
          border: 1px solid rgba(29, 158, 117, 0.3);
        }
        &[data-variant='neutral'] {
          background: var(--color-surface-2);
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
        }
      }
    `,
  ],
})
export class Badge {
  variant = input<BadgeVariant>('neutral');
}
