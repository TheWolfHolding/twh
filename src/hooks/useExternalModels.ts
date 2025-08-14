import { useEffect } from 'react';
import { preloadModels } from '../components/Objects';

/**
 * Hook per gestire il preloading di modelli 3D esterni
 * Usa CDN pubblici con modelli GLTF gratuiti
 */

// Lista di modelli 3D gratuiti da CDN pubblici
export const PUBLIC_MODELS = {
  // Modelli da Sketchfab (esempi gratuiti)
  duck: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
  avocado: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf',
  helmet: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
  brain: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf',
  suzanne: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF/Suzanne.gltf',
  
  // Modelli alternativi da Three.js examples
  flamingo: 'https://threejs.org/examples/models/gltf/Flamingo.glb',
  stork: 'https://threejs.org/examples/models/gltf/Stork.glb',
} as const;

export type ModelName = keyof typeof PUBLIC_MODELS;

/**
 * Hook per preloading modelli esterni
 */
export const useExternalModels = (modelNames: ModelName[]) => {
  useEffect(() => {
    const urls = modelNames.map(name => PUBLIC_MODELS[name]);
    
    // Preload con gestione errori per produzione
    preloadModels(urls).catch((error: unknown) => {
      console.warn('Alcuni modelli potrebbero non caricarsi:', error);
      // In produzione, non bloccamo l'app se alcuni modelli falliscono
    });
  }, [modelNames]);

  return PUBLIC_MODELS;
};

/**
 * Funzione helper per ottenere URL di un modello
 */
export const getModelUrl = (modelName: ModelName): string => {
  return PUBLIC_MODELS[modelName];
};
