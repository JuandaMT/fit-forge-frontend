import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  menuOpen = false;

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
