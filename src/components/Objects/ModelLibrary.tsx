import React from 'react';
import { ExternalModel } from '../Objects';
import { getModelUrl } from '../../hooks/useExternalModels';

/**
 * ModelLibrary - Componenti predefiniti per modelli esterni
 * Semplifica l'uso di modelli comuni con configurazioni ottimizzate
 */

export const Duck: React.FC<{
  position?: [number, number, number];
  scale?: number;
  animationType?: 'rotate' | 'float' | 'pulse' | 'orbit';
}> = ({ position = [0, 0, 0], scale = 0.01, animationType = 'float' }) => (
  <ExternalModel 
    url={getModelUrl('duck')}
    position={position}
    scale={scale}
    animationType={animationType}
  />
);

export const Avocado: React.FC<{
  position?: [number, number, number];
  scale?: number;
  animationType?: 'rotate' | 'float' | 'pulse' | 'orbit';
}> = ({ position = [0, 0, 0], scale = 3, animationType = 'pulse' }) => (
  <ExternalModel 
    url={getModelUrl('avocado')}
    position={position}
    scale={scale}
    animationType={animationType}
  />
);

export const DamagedHelmet: React.FC<{
  position?: [number, number, number];
  scale?: number;
  animationType?: 'rotate' | 'float' | 'pulse' | 'orbit';
}> = ({ position = [0, 0, 0], scale = 0.8, animationType = 'rotate' }) => (
  <ExternalModel 
    url={getModelUrl('helmet')}
    position={position}
    scale={scale}
    animationType={animationType}
  />
);

export const Suzanne: React.FC<{
  position?: [number, number, number];
  scale?: number;
  animationType?: 'rotate' | 'float' | 'pulse' | 'orbit';
}> = ({ position = [0, 0, 0], scale = 1.2, animationType = 'orbit' }) => (
  <ExternalModel 
    url={getModelUrl('suzanne')}
    position={position}
    scale={scale}
    animationType={animationType}
  />
);
