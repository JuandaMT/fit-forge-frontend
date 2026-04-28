import { Component, input } from '@angular/core';

@Component({
  selector: 'ff-section-card',
  template: `
    @if (title() || actionLabel()) {
      <header class="head">
        @if (title()) {
          <h3 class="title">{{ title() }}</h3>
        }
        @if (actionLabel()) {
          <a class="action" [attr.href]="actionHref() || null">{{ actionLabel() }}</a>
        }
      </header>
    }
    <div class="body"><ng-content /></div>
  `,
  host: { class: 'ff-section-card' },
  styles: [
    `
      :host {
        display: block;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.25rem 1.4rem;
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .title {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 1rem;
        color: var(--color-text);
        margin: 0;
        letter-spacing: -0.01em;
      }
      .action {
        color: var(--color-primary);
        font-size: 0.8rem;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    `,
  ],
})
export class SectionCard {
  title = input<string>('');
  actionLabel = input<string>('');
  actionHref = input<string>('');
}
