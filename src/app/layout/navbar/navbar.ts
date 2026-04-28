import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style="background-color: var(--color-primary);"
    >
      <div class="container-fluid px-4">
        <a
          class="navbar-brand fw-bold"
          routerLink="/dashboard"
          style="font-family: var(--font-display);"
        >
          FitForge
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav me-auto gap-1">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/workouts" routerLinkActive="active"
                >Entrenamientos</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/nutrition" routerLinkActive="active">Nutrición</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/stats" routerLinkActive="active">Estadísticas</a>
            </li>
          </ul>

          <ul class="navbar-nav gap-1">
            <li class="nav-item">
              <a class="nav-link" routerLink="/profile" routerLinkActive="active">Perfil</a>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-light btn-sm" (click)="auth.logout()">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class Navbar {
  protected auth = inject(AuthService);
}
