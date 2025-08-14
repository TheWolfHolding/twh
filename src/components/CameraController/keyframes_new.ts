import type { CameraKeyframe } from './CameraController';

/**
 * Keyframes ottimizzati per 6 sezioni:
 * 0. Homepage con modello rotante
 * 1. Social Solutions Lab
 * 2. iHyperactive  
 * 3. PVRN® & Missing Clubs®
 * 4. EyesJuice
 * 5. Contatti
 */

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 0. Homepage - Vista panoramica iniziale con focus sul centro
  {
    position: [0, 15, 10],
    target: [0, 8, 0],
    fov: 75,
    progress: 0.0
  },

  // 1. Transizione verso Social Solutions Lab
  {
    position: [8, 12, 8],
    target: [0, 6, 0],
    fov: 60, 
    progress: 0.167
  },

  // 2. Social Solutions Lab - Vista tecnica
  {
    position: [12, 8, 6],
    target: [2, 4, 0],
    fov: 45,
    progress: 0.333
  },

  // 3. iHyperactive - Vista dinamica
  {
    position: [-8, 10, 12],
    target: [-2, 2, 0],
    fov: 55,
    progress: 0.5
  },

  // 4. PVRN® & Missing Clubs® - Vista musicale/artistica
  {
    position: [0, 6, 15],
    target: [0, 0, 0],
    fov: 65,
    progress: 0.667
  },

  // 5. EyesJuice - Vista creativa/visuale
  {
    position: [-12, 4, 8],
    target: [-4, -2, 0],
    fov: 40,
    progress: 0.833
  },

  // 6. Contatti - Vista finale che si collega all'inizio
  {
    position: [4, 12, 12],
    target: [0, 6, 0],
    fov: 70,
    progress: 1.0
  }
];

// Export dei keyframes per uso nel progetto
export const INFINITE_KEYFRAMES = CAMERA_KEYFRAMES;

/**
 * Funzione che restituisce i keyframes appropriati in base al dispositivo
 */
export function getAppropriateKeyframes(): CameraKeyframe[] {
  // Per ora usiamo sempre gli stessi keyframes
  return CAMERA_KEYFRAMES;
}
