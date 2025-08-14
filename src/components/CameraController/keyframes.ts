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
  // 0. Homepage - Vista aerea della città dall'alto molto più distante
  {
    position: [0, 80, 30],
    target: [0, 25, 0],
    fov: 95,
    progress: 0.0
  },

  // 0.1 Inizio discesa graduale verso la città
  {
    position: [0, 60, 25],
    target: [0, 25, 0],
    fov: 85,
    progress: 0.05
  },

  // 0.2 Discesa più vicina alla homepage
  {
    position: [0, 40, 20],
    target: [0, 25, 0],
    fov: 75,
    progress: 0.1
  },

  // 1. Transizione - Movimento verso Social Solutions Lab
  {
    position: [15, 30, 15],
    target: [12, 15, 0],
    fov: 70,
    progress: 0.15
  },

  // 1.1 Zoom ravvicinato su Suzanne (Social Solutions Lab)
  {
    position: [18, 18, 8],
    target: [12, 15, 0],
    fov: 25,
    progress: 0.2
  },

  // 1.2 Vista completa Social Solutions Lab
  {
    position: [20, 20, 12],
    target: [12, 15, 0],
    fov: 35,
    progress: 0.25
  },

  // 2. Movimento attraverso la città verso iHyperactive
  {
    position: [-20, 25, 18],
    target: [-15, 5, 0],
    fov: 65,
    progress: 0.35
  },

  // 2.1 Zoom su Duck (iHyperactive)
  {
    position: [-22, 8, 8],
    target: [-15, 5, 0],
    fov: 20,
    progress: 0.4
  },

  // 2.2 Vista laterale iHyperactive
  {
    position: [-25, 12, 10],
    target: [-15, 5, 0],
    fov: 30,
    progress: 0.45
  },

  // 3. Volo cinematografico verso PVRN & Missing Clubs
  {
    position: [0, 40, 25],
    target: [0, -10, 0],
    fov: 80,
    progress: 0.55
  },

  // 3.1 Discesa drammatica su Avocado (PVRN & Missing Clubs)
  {
    position: [5, -5, 8],
    target: [0, -10, 0],
    fov: 18,
    progress: 0.6
  },

  // 3.2 Vista artistica PVRN
  {
    position: [8, -8, 12],
    target: [0, -10, 0],
    fov: 28,
    progress: 0.65
  },

  // 4. Movimento laterale ampio verso EyesJuice
  {
    position: [-30, 0, 20],
    target: [-18, -25, 0],
    fov: 75,
    progress: 0.72
  },

  // 4.1 Focus su Helmet (EyesJuice)
  {
    position: [-25, -22, 8],
    target: [-18, -25, 0],
    fov: 22,
    progress: 0.77
  },

  // 4.2 Vista panoramica EyesJuice
  {
    position: [-30, -20, 15],
    target: [-18, -25, 0],
    fov: 35,
    progress: 0.82
  },

  // 5. Ascesa verso Contatti
  {
    position: [0, -20, 20],
    target: [0, -40, 0],
    fov: 60,
    progress: 0.88
  },

  // 5.1 Zoom finale su Suzanne (Contatti)
  {
    position: [5, -37, 8],
    target: [0, -40, 0],
    fov: 16,
    progress: 0.92
  },

  // 5.2 Vista finale Contatti
  {
    position: [8, -35, 12],
    target: [0, -40, 0],
    fov: 25,
    progress: 0.96
  },

  // 6. Vista finale - ritorno alla panoramica totale
  {
    position: [0, 100, 40],
    target: [0, 0, 0],
    fov: 100,
    progress: 1.0
  }
];

// Export dei keyframes per uso nel progetto
export const INFINITE_KEYFRAMES = CAMERA_KEYFRAMES;
export const CINEMATIC_INFINITE_KEYFRAMES = CAMERA_KEYFRAMES;
export const MOBILE_INFINITE_KEYFRAMES = CAMERA_KEYFRAMES;

/**
 * Funzione che restituisce i keyframes appropriati in base al dispositivo
 */
export function getAppropriateKeyframes(): CameraKeyframe[] {
  // Per ora usiamo sempre gli stessi keyframes
  return CAMERA_KEYFRAMES;
}

/**
 * Funzione che restituisce i keyframes cinematografici
 */
export function getCinematicKeyframes(): CameraKeyframe[] {
  return CAMERA_KEYFRAMES;
}
