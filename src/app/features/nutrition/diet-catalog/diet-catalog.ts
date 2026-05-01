import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DietService } from '../services/diet.service';
import { Diet } from '../models/diet.model';

@Component({
  selector: 'app-diet-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './diet-catalog.html',
  styleUrls: ['./diet-catalog.scss'],
})
export class DietCatalog implements OnInit {
  private readonly dietService = inject(DietService);

  // Signals
  diets = signal<Diet[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  searchTerm = signal<string>('');
  selectedCategory = signal<string>('Todo');

  categories = ['Todo', 'Ganar Masa', 'Perder Peso', 'Mantenimiento', 'Keto', 'Vegana'];

  // Computed signal for filtered diets
  filteredDiets = computed(() => {
    let result = this.diets();

    const term = this.searchTerm().toLowerCase();
    if (term) {
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(term) ||
          d.description.toLowerCase().includes(term) ||
          (d.tags && d.tags.some((tag) => tag.toLowerCase().includes(term))),
      );
    }

    const cat = this.selectedCategory();
    if (cat !== 'Todo') {
      result = result.filter((d) => d.category === cat);
    }

    return result;
  });

  ngOnInit(): void {
    this.loadDiets();
  }

  loadDiets(): void {
    this.loading.set(true);
    this.dietService.getDiets().subscribe({
      next: (data) => {
        this.diets.set(data || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching diets', err);
        // Do not use mocks. Just set empty array or show error.
        this.error.set('No se pudieron cargar las dietas. Comprueba tu conexión.');
        this.diets.set([]);
        this.loading.set(false);
      },
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
