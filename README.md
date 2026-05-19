# FitForge

Aplicación web fullstack de fitness y nutrición desarrollada con **Angular 17** y **Symfony 7**. Incluye seguimiento de rutinas de entrenamiento, planes de dieta, estadísticas de progreso y un sistema de valoraciones y recomendaciones personalizadas.

## Stack tecnológico

- **Frontend:** Angular 17 (standalone components, signals, lazy loading)
- **Backend:** Symfony 7 (API REST)
- **Estilos:** Bootstrap 5 + SCSS
- **Testing:** Vitest

## Funcionalidades principales

- Dashboard con resumen de actividad diaria
- Gestión de rutinas de entrenamiento y catálogo de ejercicios
- Registro de sesiones activas y resumen post-entrenamiento
- Planes de dieta y buscador de alimentos con valores nutricionales
- Comparativa nutricional entre alimentos
- Seguimiento de progreso y estadísticas
- Sistema de valoraciones (★) y recomendaciones personalizadas
- Perfil de usuario

## Estructura del proyecto

```
src/app/
├── core/          # Guards, interceptors, servicios globales
├── features/      # Módulos de funcionalidad
│   ├── auth/          # Login, registro, recuperación de contraseña
│   ├── dashboard/     # Pantalla principal
│   ├── workouts/      # Rutinas, ejercicios, sesiones, progreso
│   ├── nutrition/     # Dietas, alimentos, resumen diario
│   ├── stats/         # Estadísticas y gráficas
│   └── profile/       # Perfil de usuario
├── layout/        # Layouts (main, public)
└── shared/        # Componentes y utilidades reutilizables
```

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve
# → http://localhost:4200

# Build de producción
ng build

# Tests
ng test
```

## Vistas (30 vistas planificadas)

| Módulo | Vistas |
|--------|--------|
| Auth | Login, Registro, Recuperar contraseña |
| Dashboard | Resumen diario |
| Entrenamientos | Catálogo de rutinas, Detalle de rutina, Catálogo de ejercicios, Detalle de ejercicio, Nueva sesión, Detalle de sesión, Resumen de sesión, Historial, Progreso |
| Nutrición | Dieta diaria, Catálogo de dietas, Detalle de dieta, Buscador de alimentos, Detalle de alimento, Resumen diario, Comparativa nutricional |
| Estadísticas | Estadísticas generales |
| Perfil | Perfil de usuario |
