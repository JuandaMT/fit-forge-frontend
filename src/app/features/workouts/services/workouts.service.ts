import { Injectable, signal } from '@angular/core';
import {
  Exercise,
  ExerciseDetail,
  ExerciseProgress,
  ProgressKpi,
  Routine,
  RoutineDetail,
  ScheduledDay,
  SessionHistoryItem,
  SessionSummaryData,
  ActiveExercise,
} from '../models/workouts.models';

const ROUTINES: Routine[] = [
  {
    id: '1',
    name: 'Full Body Fuerza',
    level: 'mid',
    category: 'Fuerza',
    daysPerWeek: 3,
    durationMin: 60,
    description:
      'Rutina completa de fuerza que trabaja todos los grupos musculares en cada sesión. Ideal para ganar masa muscular y fuerza general.',
    exerciseCount: 6,
  },
  {
    id: '2',
    name: 'Tren Superior Hipertrofia',
    level: 'hard',
    category: 'Hipertrofia',
    daysPerWeek: 4,
    durationMin: 75,
    description:
      'Programa de alta intensidad enfocado en el desarrollo muscular del tren superior. Pecho, espalda, hombros y brazos.',
    exerciseCount: 8,
  },
  {
    id: '3',
    name: 'Cardio HIIT Quema Grasa',
    level: 'hard',
    category: 'Cardio',
    daysPerWeek: 5,
    durationMin: 35,
    description:
      'Entrenamiento de alta intensidad por intervalos diseñado para maximizar la quema de grasa en el menor tiempo posible.',
    exerciseCount: 7,
  },
  {
    id: '4',
    name: 'Iniciación al Gimnasio',
    level: 'easy',
    category: 'Full Body',
    daysPerWeek: 3,
    durationMin: 45,
    description:
      'Rutina perfecta para comenzar en el gimnasio. Aprende la técnica básica de los ejercicios fundamentales con cargas ligeras.',
    exerciseCount: 5,
  },
  {
    id: '5',
    name: 'Tren Inferior Potencia',
    level: 'mid',
    category: 'Fuerza',
    daysPerWeek: 2,
    durationMin: 55,
    description:
      'Rutina especializada en piernas: cuádriceps, isquiotibiales, glúteos y gemelos. Incluye sentadilla, peso muerto y prensa.',
    exerciseCount: 6,
  },
  {
    id: '6',
    name: 'Movilidad y Flexibilidad',
    level: 'easy',
    category: 'Movilidad',
    daysPerWeek: 6,
    durationMin: 30,
    description:
      'Secuencia de movilidad articular y estiramiento dinámico para mejorar la flexibilidad y prevenir lesiones.',
    exerciseCount: 10,
  },
];

const ROUTINE_DETAILS: Record<string, RoutineDetail> = {
  '1': {
    ...ROUTINES[0],
    author: 'FitForge Team',
    lastUpdated: '15 mar 2025',
    exercises: [
      { exerciseId: '1', name: 'Press de banca', sets: 4, reps: '8-10', restSec: 90 },
      { exerciseId: '2', name: 'Sentadilla con barra', sets: 4, reps: '8-10', restSec: 120 },
      {
        exerciseId: '3',
        name: 'Peso muerto',
        sets: 3,
        reps: '6-8',
        restSec: 120,
        note: 'Mantén la espalda recta',
      },
      { exerciseId: '4', name: 'Remo con barra', sets: 3, reps: '10-12', restSec: 90 },
      { exerciseId: '5', name: 'Press militar', sets: 3, reps: '10-12', restSec: 90 },
      { exerciseId: '6', name: 'Dominadas', sets: 3, reps: 'Al fallo', restSec: 90 },
    ],
  },
  '2': {
    ...ROUTINES[1],
    author: 'FitForge Team',
    lastUpdated: '2 abr 2025',
    exercises: [
      { exerciseId: '1', name: 'Press de banca inclinado', sets: 4, reps: '10-12', restSec: 90 },
      { exerciseId: '7', name: 'Press de banca plano', sets: 4, reps: '8-10', restSec: 90 },
      { exerciseId: '4', name: 'Remo en polea', sets: 4, reps: '12-15', restSec: 75 },
      { exerciseId: '5', name: 'Press Arnold', sets: 3, reps: '12-15', restSec: 75 },
      { exerciseId: '8', name: 'Curl de bíceps', sets: 3, reps: '12-15', restSec: 60 },
      { exerciseId: '9', name: 'Extensión de tríceps', sets: 3, reps: '12-15', restSec: 60 },
      { exerciseId: '6', name: 'Dominadas lastre', sets: 3, reps: '6-8', restSec: 90 },
      { exerciseId: '10', name: 'Elevaciones laterales', sets: 4, reps: '15-20', restSec: 60 },
    ],
  },
  '3': {
    ...ROUTINES[2],
    author: 'FitForge Team',
    lastUpdated: '10 abr 2025',
    exercises: [
      {
        exerciseId: '11',
        name: 'Burpees',
        sets: 5,
        reps: '30s trabajo / 15s descanso',
        restSec: 15,
      },
      {
        exerciseId: '12',
        name: 'Mountain climbers',
        sets: 5,
        reps: '30s trabajo / 15s descanso',
        restSec: 15,
      },
      { exerciseId: '13', name: 'Saltos al cajón', sets: 4, reps: '10', restSec: 30 },
      {
        exerciseId: '14',
        name: 'Sprints en cinta',
        sets: 8,
        reps: '20s al 90% / 40s caminando',
        restSec: 40,
      },
      { exerciseId: '15', name: 'Kettlebell swing', sets: 4, reps: '20', restSec: 45 },
      { exerciseId: '16', name: 'Jump squats', sets: 4, reps: '15', restSec: 45 },
      { exerciseId: '17', name: 'Battle ropes', sets: 4, reps: '30s', restSec: 30 },
    ],
  },
  '4': {
    ...ROUTINES[3],
    author: 'FitForge Team',
    lastUpdated: '1 ene 2025',
    exercises: [
      {
        exerciseId: '18',
        name: 'Sentadilla goblet',
        sets: 3,
        reps: '12-15',
        restSec: 75,
        note: 'Con kettlebell ligero',
      },
      { exerciseId: '19', name: 'Press mancuernas plano', sets: 3, reps: '12-15', restSec: 75 },
      { exerciseId: '20', name: 'Jalón en polea', sets: 3, reps: '12-15', restSec: 75 },
      { exerciseId: '21', name: 'Press hombros mancuernas', sets: 3, reps: '12-15', restSec: 60 },
      { exerciseId: '22', name: 'Plancha abdominal', sets: 3, reps: '30s', restSec: 60 },
    ],
  },
  '5': {
    ...ROUTINES[4],
    author: 'FitForge Team',
    lastUpdated: '20 mar 2025',
    exercises: [
      {
        exerciseId: '2',
        name: 'Sentadilla con barra',
        sets: 5,
        reps: '5',
        restSec: 180,
        note: 'Trabajo de fuerza máxima',
      },
      { exerciseId: '3', name: 'Peso muerto rumano', sets: 4, reps: '8', restSec: 120 },
      { exerciseId: '23', name: 'Prensa de piernas', sets: 4, reps: '12-15', restSec: 90 },
      {
        exerciseId: '24',
        name: 'Zancadas con barra',
        sets: 3,
        reps: '10 cada pierna',
        restSec: 90,
      },
      { exerciseId: '25', name: 'Curl de isquiotibiales', sets: 3, reps: '12-15', restSec: 75 },
      { exerciseId: '26', name: 'Elevación de gemelos', sets: 4, reps: '20', restSec: 60 },
    ],
  },
  '6': {
    ...ROUTINES[5],
    author: 'FitForge Team',
    lastUpdated: '5 abr 2025',
    exercises: [
      { exerciseId: '27', name: 'Movilidad de cadera', sets: 2, reps: '10 cada lado', restSec: 30 },
      {
        exerciseId: '28',
        name: 'Rotaciones de hombro',
        sets: 2,
        reps: '15 cada lado',
        restSec: 30,
      },
      { exerciseId: '29', name: 'Cat-cow', sets: 2, reps: '15', restSec: 30 },
      {
        exerciseId: '30',
        name: 'Estiramiento de pectoral',
        sets: 2,
        reps: '30s cada lado',
        restSec: 30,
      },
      { exerciseId: '31', name: 'Paloma de yoga', sets: 2, reps: '45s cada lado', restSec: 30 },
      { exerciseId: '32', name: 'Estiramiento de isquios', sets: 2, reps: '30s', restSec: 30 },
      { exerciseId: '33', name: 'Postura del niño', sets: 2, reps: '45s', restSec: 30 },
      {
        exerciseId: '34',
        name: 'Estiramiento de cuádriceps',
        sets: 2,
        reps: '30s cada lado',
        restSec: 30,
      },
      {
        exerciseId: '35',
        name: 'Movilidad de tobillo',
        sets: 2,
        reps: '10 cada lado',
        restSec: 30,
      },
      { exerciseId: '36', name: 'Rodillo de espuma — espalda', sets: 1, reps: '60s', restSec: 0 },
    ],
  },
};

const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Press de banca',
    muscleGroup: 'pecho',
    equipment: 'Barra',
    difficulty: 'mid',
    avgRating: 4.6,
  },
  {
    id: '2',
    name: 'Sentadilla con barra',
    muscleGroup: 'piernas',
    equipment: 'Barra',
    difficulty: 'hard',
    avgRating: 4.8,
  },
  {
    id: '3',
    name: 'Peso muerto',
    muscleGroup: 'espalda',
    equipment: 'Barra',
    difficulty: 'hard',
    avgRating: 4.7,
  },
  {
    id: '4',
    name: 'Remo con barra',
    muscleGroup: 'espalda',
    equipment: 'Barra',
    difficulty: 'mid',
    avgRating: 4.4,
  },
  {
    id: '5',
    name: 'Press militar',
    muscleGroup: 'hombros',
    equipment: 'Barra',
    difficulty: 'mid',
    avgRating: 4.3,
  },
  {
    id: '6',
    name: 'Dominadas',
    muscleGroup: 'espalda',
    equipment: 'Peso corporal',
    difficulty: 'hard',
    avgRating: 4.9,
  },
  {
    id: '8',
    name: 'Curl de bíceps',
    muscleGroup: 'biceps',
    equipment: 'Mancuernas',
    difficulty: 'easy',
    avgRating: 4.1,
  },
  {
    id: '9',
    name: 'Extensión de tríceps',
    muscleGroup: 'triceps',
    equipment: 'Polea',
    difficulty: 'easy',
    avgRating: 4.0,
  },
  {
    id: '10',
    name: 'Elevaciones laterales',
    muscleGroup: 'hombros',
    equipment: 'Mancuernas',
    difficulty: 'easy',
    avgRating: 4.2,
  },
  {
    id: '11',
    name: 'Burpees',
    muscleGroup: 'cardio',
    equipment: 'Peso corporal',
    difficulty: 'hard',
    avgRating: 3.8,
  },
  {
    id: '22',
    name: 'Plancha abdominal',
    muscleGroup: 'abdomen',
    equipment: 'Peso corporal',
    difficulty: 'easy',
    avgRating: 4.3,
  },
  {
    id: '23',
    name: 'Prensa de piernas',
    muscleGroup: 'piernas',
    equipment: 'Máquina',
    difficulty: 'mid',
    avgRating: 4.2,
  },
  {
    id: '24',
    name: 'Zancadas con barra',
    muscleGroup: 'piernas',
    equipment: 'Barra',
    difficulty: 'mid',
    avgRating: 4.4,
  },
  {
    id: '25',
    name: 'Curl de isquiotibiales',
    muscleGroup: 'piernas',
    equipment: 'Máquina',
    difficulty: 'easy',
    avgRating: 4.0,
  },
  {
    id: '26',
    name: 'Elevación de gemelos',
    muscleGroup: 'piernas',
    equipment: 'Máquina',
    difficulty: 'easy',
    avgRating: 3.9,
  },
];

const EXERCISE_DETAILS: Record<string, ExerciseDetail> = {
  '1': {
    ...EXERCISES[0],
    instructions: [
      'Túmbate en el banco con los pies apoyados en el suelo.',
      'Agarra la barra con un agarre ligeramente más ancho que los hombros.',
      'Desrackea la barra y colócala sobre el pecho con los codos a 45°.',
      'Baja la barra de forma controlada hasta rozar el pecho.',
      'Empuja explosivamente hacia arriba hasta extender los codos.',
      'Vuelve a rackear la barra al finalizar la serie.',
    ],
    tips: [
      'Mantén los omóplatos retraídos durante todo el movimiento.',
      'No dejes que los codos se abran más de 75°.',
      'Usa siempre un acompañante o jaulas de seguridad con cargas pesadas.',
    ],
    ratingCount: 234,
    history: [
      { date: '14 abr 2025', sets: 4, reps: 10, weight: '80 kg' },
      { date: '10 abr 2025', sets: 4, reps: 10, weight: '77.5 kg' },
      { date: '6 abr 2025', sets: 4, reps: 9, weight: '77.5 kg' },
      { date: '2 abr 2025', sets: 4, reps: 8, weight: '75 kg' },
      { date: '29 mar 2025', sets: 3, reps: 10, weight: '75 kg' },
    ],
  },
  '2': {
    ...EXERCISES[1],
    instructions: [
      'Coloca la barra en el rack a la altura de los hombros.',
      'Sitúate debajo de la barra y apóyala sobre los trapecios.',
      'Separa los pies a la anchura de los hombros con las puntas ligeramente abiertas.',
      'Desrackea y da dos pasos atrás.',
      'Flexiona caderas y rodillas simultáneamente descendiendo hasta que los muslos estén paralelos al suelo.',
      'Empuja a través de los talones para volver a la posición inicial.',
    ],
    tips: [
      'Mantén el pecho arriba y la mirada al frente.',
      'No dejes que las rodillas colapsen hacia dentro.',
      'Respira profundo antes de bajar y exhala en el esfuerzo.',
    ],
    ratingCount: 312,
    history: [
      { date: '15 abr 2025', sets: 4, reps: 8, weight: '100 kg' },
      { date: '11 abr 2025', sets: 4, reps: 8, weight: '97.5 kg' },
      { date: '7 abr 2025', sets: 4, reps: 8, weight: '95 kg' },
      { date: '3 abr 2025', sets: 4, reps: 7, weight: '95 kg' },
      { date: '30 mar 2025', sets: 4, reps: 6, weight: '92.5 kg' },
    ],
  },
};

const ACTIVE_SESSION_DATA = {
  routineName: 'Full Body Fuerza',
  exercises: [
    {
      exerciseId: '1',
      name: 'Press de banca',
      muscleGroup: 'pecho' as const,
      targetSets: 4,
      targetReps: '8-10',
      rating: 0,
      sets: [
        { setNumber: 1, reps: null, weight: '80', done: false },
        { setNumber: 2, reps: null, weight: '80', done: false },
        { setNumber: 3, reps: null, weight: '80', done: false },
        { setNumber: 4, reps: null, weight: '80', done: false },
      ],
    },
    {
      exerciseId: '2',
      name: 'Sentadilla con barra',
      muscleGroup: 'piernas' as const,
      targetSets: 4,
      targetReps: '8-10',
      rating: 0,
      sets: [
        { setNumber: 1, reps: null, weight: '100', done: false },
        { setNumber: 2, reps: null, weight: '100', done: false },
        { setNumber: 3, reps: null, weight: '100', done: false },
        { setNumber: 4, reps: null, weight: '100', done: false },
      ],
    },
    {
      exerciseId: '3',
      name: 'Peso muerto',
      muscleGroup: 'espalda' as const,
      targetSets: 3,
      targetReps: '6-8',
      rating: 0,
      sets: [
        { setNumber: 1, reps: null, weight: '120', done: false },
        { setNumber: 2, reps: null, weight: '120', done: false },
        { setNumber: 3, reps: null, weight: '120', done: false },
      ],
    },
    {
      exerciseId: '4',
      name: 'Remo con barra',
      muscleGroup: 'espalda' as const,
      targetSets: 3,
      targetReps: '10-12',
      rating: 0,
      sets: [
        { setNumber: 1, reps: null, weight: '70', done: false },
        { setNumber: 2, reps: null, weight: '70', done: false },
        { setNumber: 3, reps: null, weight: '70', done: false },
      ],
    },
  ] as ActiveExercise[],
};

const SESSION_HISTORY: SessionHistoryItem[] = [
  {
    id: '1',
    routineName: 'Full Body Fuerza',
    date: '14 abr 2025',
    daysAgo: 0,
    durationMin: 58,
    exerciseCount: 6,
    totalVolume: 5240,
    rating: 4.5,
  },
  {
    id: '2',
    routineName: 'Tren Superior Hipertrofia',
    date: '11 abr 2025',
    daysAgo: 3,
    durationMin: 72,
    exerciseCount: 8,
    totalVolume: 4860,
    rating: 4,
  },
  {
    id: '3',
    routineName: 'Full Body Fuerza',
    date: '9 abr 2025',
    daysAgo: 5,
    durationMin: 55,
    exerciseCount: 6,
    totalVolume: 5100,
    rating: 5,
  },
  {
    id: '4',
    routineName: 'Tren Inferior Potencia',
    date: '7 abr 2025',
    daysAgo: 7,
    durationMin: 63,
    exerciseCount: 6,
    totalVolume: 6800,
    rating: 4,
  },
  {
    id: '5',
    routineName: 'Tren Superior Hipertrofia',
    date: '4 abr 2025',
    daysAgo: 10,
    durationMin: 70,
    exerciseCount: 8,
    totalVolume: 4650,
    rating: 3.5,
  },
  {
    id: '6',
    routineName: 'Full Body Fuerza',
    date: '2 abr 2025',
    daysAgo: 12,
    durationMin: 61,
    exerciseCount: 6,
    totalVolume: 5050,
    rating: 4.5,
  },
  {
    id: '7',
    routineName: 'Cardio HIIT',
    date: '31 mar 2025',
    daysAgo: 14,
    durationMin: 35,
    exerciseCount: 7,
    totalVolume: 0,
    rating: 4,
  },
  {
    id: '8',
    routineName: 'Tren Superior Hipertrofia',
    date: '28 mar 2025',
    daysAgo: 17,
    durationMin: 68,
    exerciseCount: 8,
    totalVolume: 4520,
    rating: 4,
  },
  {
    id: '9',
    routineName: 'Full Body Fuerza',
    date: '26 mar 2025',
    daysAgo: 19,
    durationMin: 59,
    exerciseCount: 6,
    totalVolume: 4980,
    rating: 5,
  },
  {
    id: '10',
    routineName: 'Tren Inferior Potencia',
    date: '24 mar 2025',
    daysAgo: 21,
    durationMin: 65,
    exerciseCount: 6,
    totalVolume: 6550,
    rating: 4.5,
  },
];

const SESSION_SUMMARY: SessionSummaryData = {
  id: '1',
  routineName: 'Full Body Fuerza',
  date: '14 abr 2025',
  durationMin: 58,
  totalVolume: 5240,
  exercises: [
    {
      exerciseId: '1',
      name: 'Press de banca',
      rating: 4,
      difficulty: 'mid',
      difficultyLabel: 'Medio',
      sets: [
        { setNumber: 1, reps: 10, weight: '80 kg' },
        { setNumber: 2, reps: 10, weight: '80 kg' },
        { setNumber: 3, reps: 9, weight: '80 kg' },
        { setNumber: 4, reps: 8, weight: '80 kg' },
      ],
    },
    {
      exerciseId: '2',
      name: 'Sentadilla con barra',
      rating: 5,
      difficulty: 'hard',
      difficultyLabel: 'Duro',
      sets: [
        { setNumber: 1, reps: 10, weight: '100 kg' },
        { setNumber: 2, reps: 10, weight: '100 kg' },
        { setNumber: 3, reps: 9, weight: '100 kg' },
        { setNumber: 4, reps: 8, weight: '100 kg' },
      ],
    },
    {
      exerciseId: '3',
      name: 'Peso muerto',
      rating: 4,
      difficulty: 'hard',
      difficultyLabel: 'Duro',
      sets: [
        { setNumber: 1, reps: 6, weight: '120 kg' },
        { setNumber: 2, reps: 6, weight: '120 kg' },
        { setNumber: 3, reps: 5, weight: '120 kg' },
      ],
    },
    {
      exerciseId: '4',
      name: 'Remo con barra',
      rating: 4,
      difficulty: 'mid',
      difficultyLabel: 'Medio',
      sets: [
        { setNumber: 1, reps: 12, weight: '70 kg' },
        { setNumber: 2, reps: 11, weight: '70 kg' },
        { setNumber: 3, reps: 10, weight: '70 kg' },
      ],
    },
  ],
  personalBests: ['Sentadilla con barra — nuevo máximo: 100 kg × 10 reps'],
};

@Injectable({ providedIn: 'root' })
export class WorkoutsService {
  getRoutines() {
    return signal(ROUTINES);
  }

  getRoutineById(id: string) {
    return signal(ROUTINE_DETAILS[id] ?? ROUTINE_DETAILS['1']);
  }

  getExercises() {
    return signal(EXERCISES);
  }

  getExerciseById(id: string) {
    return signal(EXERCISE_DETAILS[id] ?? EXERCISE_DETAILS['1']);
  }

  getActiveSession(routineId?: string | null) {
    if (routineId && ROUTINE_DETAILS[routineId]) {
      const detail = ROUTINE_DETAILS[routineId];
      const exercises: typeof ACTIVE_SESSION_DATA.exercises = detail.exercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        name: ex.name,
        muscleGroup: (EXERCISES.find((e) => e.id === ex.exerciseId)?.muscleGroup ??
          'pecho') as ActiveExercise['muscleGroup'],
        targetSets: ex.sets,
        targetReps: ex.reps,
        rating: 0,
        sets: Array.from({ length: ex.sets }, (_, i) => ({
          setNumber: i + 1,
          reps: null,
          weight: '0',
          done: false,
        })),
      }));
      return signal({ routineName: detail.name, exercises });
    }
    return signal(ACTIVE_SESSION_DATA);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSessionSummary(sessionId: string) {
    return signal(SESSION_SUMMARY);
  }

  getSessionHistory() {
    return signal(SESSION_HISTORY);
  }

  getProgressKpis(): ReturnType<typeof signal<ProgressKpi[]>> {
    return signal<ProgressKpi[]>([
      {
        label: 'Récords rotos',
        value: 7,
        unit: 'este mes',
        hint: '+3 respecto al mes anterior',
        tone: 'primary',
      },
      {
        label: 'Peso máximo',
        value: '120',
        unit: 'kg',
        hint: 'Peso muerto — 14 abr',
        tone: 'stars',
      },
      { label: 'Mejor racha', value: 14, unit: 'días', hint: 'Racha activa actual', tone: 'info' },
      {
        label: 'Volumen semanal',
        value: '5.1',
        unit: 'k kg',
        hint: 'Promedio últimas 4 semanas',
        tone: 'default',
      },
    ]);
  }

  getWeeklySchedule(): ReturnType<typeof signal<ScheduledDay[]>> {
    // Rutina activa asignada: Full Body Fuerza (Lun / Mié / Vie)
    const activeRoutine = { id: '1', name: 'Full Body Fuerza' };
    const trainingDays = new Set([1, 3, 5]); // 0=Dom, 1=Lun, …, 6=Sáb

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calcular el lunes de la semana actual
    const dayOfWeek = today.getDay(); // 0=Dom
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    // Fechas de sesiones completadas esta semana (comparamos por daysAgo)
    const completedDaysAgo = new Set(SESSION_HISTORY.map((s) => s.daysAgo));

    const week: ScheduledDay[] = dayLabels.map((label, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const isoDay = (i + 1) % 7; // Lun=1 … Dom=0
      const jsDay = isoDay === 0 ? 0 : isoDay;
      const isTraining = trainingDays.has(jsDay);

      // Días pasados de la semana actual: calcular cuántos días hace
      const diffMs = today.getTime() - date.getTime();
      const daysAgo = Math.round(diffMs / 86_400_000);
      const isPast = daysAgo > 0;
      const completed = isTraining && isPast && completedDaysAgo.has(daysAgo);

      return {
        dayLabel: label,
        date,
        routine: isTraining ? activeRoutine : null,
        isToday: date.getTime() === today.getTime(),
        isRest: !isTraining,
        completed,
      };
    });

    return signal(week);
  }

  getExerciseProgress(): ReturnType<typeof signal<ExerciseProgress[]>> {
    return signal<ExerciseProgress[]>([
      {
        exerciseId: '1',
        name: 'Press de banca',
        initialWeight: 60,
        currentWeight: 80,
        records: [
          { date: '1 mar', weight: 60, reps: 10 },
          { date: '8 mar', weight: 65, reps: 10 },
          { date: '15 mar', weight: 70, reps: 10 },
          { date: '22 mar', weight: 72.5, reps: 10 },
          { date: '29 mar', weight: 75, reps: 10 },
          { date: '5 abr', weight: 77.5, reps: 10 },
          { date: '12 abr', weight: 80, reps: 10 },
          { date: '14 abr', weight: 80, reps: 10 },
        ],
      },
      {
        exerciseId: '2',
        name: 'Sentadilla',
        initialWeight: 80,
        currentWeight: 100,
        records: [
          { date: '1 mar', weight: 80, reps: 8 },
          { date: '8 mar', weight: 85, reps: 8 },
          { date: '15 mar', weight: 87.5, reps: 8 },
          { date: '22 mar', weight: 90, reps: 8 },
          { date: '29 mar', weight: 92.5, reps: 8 },
          { date: '5 abr', weight: 95, reps: 8 },
          { date: '12 abr', weight: 97.5, reps: 8 },
          { date: '14 abr', weight: 100, reps: 8 },
        ],
      },
      {
        exerciseId: '3',
        name: 'Peso muerto',
        initialWeight: 100,
        currentWeight: 120,
        records: [
          { date: '1 mar', weight: 100, reps: 6 },
          { date: '8 mar', weight: 105, reps: 6 },
          { date: '15 mar', weight: 107.5, reps: 6 },
          { date: '22 mar', weight: 110, reps: 6 },
          { date: '29 mar', weight: 112.5, reps: 6 },
          { date: '5 abr', weight: 115, reps: 6 },
          { date: '12 abr', weight: 117.5, reps: 6 },
          { date: '14 abr', weight: 120, reps: 6 },
        ],
      },
      {
        exerciseId: '4',
        name: 'Remo con barra',
        initialWeight: 60,
        currentWeight: 72.5,
        records: [
          { date: '1 mar', weight: 60, reps: 12 },
          { date: '8 mar', weight: 62.5, reps: 12 },
          { date: '15 mar', weight: 65, reps: 12 },
          { date: '22 mar', weight: 65, reps: 12 },
          { date: '29 mar', weight: 67.5, reps: 12 },
          { date: '5 abr', weight: 70, reps: 12 },
          { date: '12 abr', weight: 72.5, reps: 12 },
          { date: '14 abr', weight: 72.5, reps: 12 },
        ],
      },
    ]);
  }
}
