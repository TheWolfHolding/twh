import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { Group } from 'three';

/**
 * LoadingFallback - Componente di loading per modelli 3D
 */
const LoadingFallback: React.FC = () => (
  <Html center>
    <div style={{ 
      color: 'white', 
      fontSize: '12px', 
      textAlign: 'center',
      background: 'rgba(0,0,0,0.5)',
      padding: '10px',
      borderRadius: '5px'
    }}>
      <div>Loading 3D Model...</div>
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        ⚡ Powered by Three.js
      </div>
    </div>
  </Html>
);

/**
 * ExternalModel - Componente per caricare modelli GLTF esterni
 * @param url - URL del modello GLTF da caricare
 * @param position - Posizione del modello [x, y, z]
 * @param scale - Scala del modello
 * @param rotation - Rotazione del modello [x, y, z]
 * @param animated - Se true, applica animazioni automatiche
 */
interface ExternalModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  animated?: boolean;
  animationType?: 'rotate' | 'float' | 'pulse' | 'orbit';
}

const ModelContent: React.FC<ExternalModelProps> = ({ 
  url, 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0],
  animated = true,
  animationType = 'rotate'
}) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(url);

  // Animazioni personalizzabili
  useFrame((state) => {
    if (!groupRef.current || !animated) return;

    switch (animationType) {
      case 'rotate':
        groupRef.current.rotation.y += 0.01;
        break;
      case 'float':
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        groupRef.current.rotation.y += 0.005;
        break;
      case 'pulse':
        const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        groupRef.current.scale.setScalar(Array.isArray(scale) ? scale[0] * pulseFactor : scale * pulseFactor);
        break;
      case 'orbit':
        const radius = 0.5;
        groupRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime) * radius;
        groupRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime) * radius;
        groupRef.current.rotation.y += 0.02;
        break;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale} 
      rotation={rotation}
    >
      <primitive object={scene.clone()} />
    </group>
  );
};

const ExternalModel: React.FC<ExternalModelProps> = (props) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ModelContent {...props} />
    </Suspense>
  );
};

// Preload dei modelli per performance migliori
export const preloadModels = async (urls: string[]): Promise<void> => {
  try {
    const preloadPromises = urls.map(url => 
      new Promise<void>((resolve) => {
        try {
          useGLTF.preload(url);
          resolve();
        } catch (error) {
          console.warn(`Errore preload modello ${url}:`, error);
          resolve(); // Non blocchiamo per un singolo errore
        }
      })
    );
    
    await Promise.allSettled(preloadPromises);
  } catch (error) {
    console.warn('Errore durante il preload dei modelli:', error);
  }
};

export default ExternalModel;
