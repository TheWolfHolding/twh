import type { CameraKeyframe } from './CameraController';

/**
 * Keyframes ottimizzati per 2 modelli ripetuti (Helmet + Suzanne) x2
 * La camera segue un percorso che si connette perfettamente da fine a inizio
 */

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 1. Inizio - Vista panoramica dall'alto
  {
    position: [0, 16, 8],
    target: [0, 12, 0],
    fov: 75,
    progress: 0.0
  },

  // 2. Focus su Helmet 1 (Y: 12) - Discovery
  {
    position: [0, 14, 6],
    target: [0, 12, 0],
    fov: 45, 
    progress: 0.125
  },

  // 3. Close-up Helmet 1
  {
    position: [2, 12, 4],
    target: [0, 12, 0],
    fov: 35,
    progress: 0.25
  },

  // 4. Focus su Suzanne 1 (Y: 8) - Welcome
  {
    position: [0, 10, 5],
    target: [0, 8, 0],
    fov: 50,
    progress: 0.375
  },

  // 5. Focus su Helmet 2 (Y: 4) - Deep Analysis
  {
    position: [-2, 6, 3],
    target: [0, 4, 0],
    fov: 40,
    progress: 0.5
  },

  // 6. Close-up drammatico Helmet 2
  {
    position: [1, 4, 2],
    target: [0, 4, 0],
    fov: 30,
    progress: 0.625
  },

  // 7. Focus su Suzanne 2 (Y: 0) - Evolution
  {
    position: [0, 2, 4],
    target: [0, 0, 0],
    fov: 55,
    progress: 0.75
  },

  // 8. Vista finale Suzanne 2 - Preparazione al loop
  {
    position: [0, -2, 6],
    target: [0, 0, 0],
    fov: 65,
    progress: 0.875
  },

  // 9. Transizione finale per loop infinito
  {
    position: [0, -4, 8],
    target: [0, 12, 0], // Punta già verso l'inizio
    fov: 75,
    progress: 1.0
  }
];

/**
 * Keyframes cinematografici per esperienze desktop
 * Movimenti più drammatici e zoom più pronunciati
 */
export const CINEMATIC_KEYFRAMES: CameraKeyframe[] = [
  // Vista aerea drammatica
  {
    position: [0, 20, 12],
    target: [0, 12, 0],
    fov: 80,
    progress: 0.0
  },

  // Discesa cinematografica verso Helmet 1
  {
    position: [3, 15, 8],
    target: [0, 12, 0],
    fov: 40,
    progress: 0.125
  },

  // Close-up drammatico Helmet 1
  {
    position: [4, 12, 3],
    target: [0, 12, 0],
    fov: 25,
    progress: 0.25
  },

  // Movimento fluido verso Suzanne 1
  {
    position: [-2, 10, 6],
    target: [0, 8, 0],
    fov: 45,
    progress: 0.375
  },

  // Focus artistico su Helmet 2
  {
    position: [-4, 6, 2],
    target: [0, 4, 0],
    fov: 35,
    progress: 0.5
  },

  // Zoom estremo Helmet 2
  {
    position: [2, 4, 1],
    target: [0, 4, 0],
    fov: 20,
    progress: 0.625
  },

  // Vista maestosa Suzanne 2
  {
    position: [0, 3, 7],
    target: [0, 0, 0],
    fov: 60,
    progress: 0.75
  },

  // Preparazione finale per il loop
  {
    position: [0, -5, 10],
    target: [0, 0, 0],
    fov: 70,
    progress: 0.875
  },

  // Ritorno cinematografico all'inizio
  {
    position: [0, -8, 15],
    target: [0, 12, 0],
    fov: 80,
    progress: 1.0
  }
];

/**
 * Keyframes ottimizzati per dispositivi mobili
 * Movimenti più semplici e distanze maggiori per touch
 */
export const MOBILE_KEYFRAMES: CameraKeyframe[] = [
  // Vista mobile ampia
  {
    position: [0, 18, 10],
    target: [0, 12, 0],
    fov: 85,
    progress: 0.0
  },

  // Focus mobile Helmet 1
  {
    position: [0, 15, 8],
    target: [0, 12, 0],
    fov: 55,
    progress: 0.25
  },

  // Focus mobile Suzanne 1
  {
    position: [0, 11, 7],
    target: [0, 8, 0],
    fov: 60,
    progress: 0.375
  },

  // Focus mobile Helmet 2
  {
    position: [0, 7, 6],
    target: [0, 4, 0],
    fov: 50,
    progress: 0.625
  },

  // Focus mobile Suzanne 2
  {
    position: [0, 3, 8],
    target: [0, 0, 0],
    fov: 65,
    progress: 0.75
  },

  // Ritorno mobile all'inizio
  {
    position: [0, -2, 12],
    target: [0, 12, 0],
    fov: 85,
    progress: 1.0
  }
];

// Export dei keyframes per uso nel progetto
export const INFINITE_KEYFRAMES = CAMERA_KEYFRAMES;
export const CINEMATIC_INFINITE_KEYFRAMES = CINEMATIC_KEYFRAMES;
export const MOBILE_INFINITE_KEYFRAMES = MOBILE_KEYFRAMES;

/**
 * Funzione che restituisce i keyframes appropriati in base al dispositivo
 */
export function getAppropriateKeyframes(): CameraKeyframe[] {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  if (isMobile) {
    return MOBILE_INFINITE_KEYFRAMES;
  } else if (isTablet) {
    return INFINITE_KEYFRAMES;
  } else {
    return CINEMATIC_INFINITE_KEYFRAMES;
  }
}

/**
 * Funzione che restituisce sempre i keyframes cinematografici
 */
export function getCinematicKeyframes(): CameraKeyframe[] {
  return CINEMATIC_INFINITE_KEYFRAMES;
}
