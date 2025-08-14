import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { Group } from 'three';

/**
 * GLTF3DModel Component - Carica e anima modelli 3D esterni
 * @param modelPath - Percorso del modello GLTF
 * @param position - Posizione del modello [x, y, z]
 * @param scale - Scala del modello
 * @param animationType - Tipo di animazione ('rotate' | 'float' | 'orbit' | 'static')
 */
interface GLTF3DModelProps {
  modelPath: string;
  position: [number, number, number];
  scale?: number;
  animationType?: 'rotate' | 'float' | 'orbit' | 'static';
  rotationSpeed?: number;
  fallbackColor?: string;
}

const GLTF3DModel: React.FC<GLTF3DModelProps> = ({
  modelPath,
  position,
  scale = 1,
  animationType = 'rotate',
  rotationSpeed = 0.01,
  fallbackColor = "#646cff"
}) => {
  const groupRef = useRef<Group>(null);
  const [error, setError] = useState<boolean>(false);
  
  // Carica il modello GLTF con error handling
  let gltf;
  try {
    gltf = useGLTF(modelPath);
  } catch (err) {
    if (!error) {
      console.warn(`Errore nel caricamento del modello: ${modelPath}`, err);
      setError(true);
    }
  }

  // Animazioni dei modelli
  useFrame((state) => {
    if (groupRef.current && !error) {
      switch (animationType) {
        case 'rotate':
          groupRef.current.rotation.y += rotationSpeed;
          groupRef.current.rotation.x += rotationSpeed * 0.5;
          break;
          
        case 'float':
          groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
          groupRef.current.rotation.y += rotationSpeed * 0.5;
          break;
          
        case 'orbit':
          const radius = 1;
          groupRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime) * radius;
          groupRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime) * radius;
          groupRef.current.rotation.y += rotationSpeed;
          break;
          
        case 'static':
        default:
          // Nessuna animazione automatica
          break;
      }
    }
  });

  // Fallback se il modello non può essere caricato
  if (error || !gltf) {
    return (
      <group ref={groupRef} position={position} scale={scale}>
        {/* Placeholder geometrico in caso di errore */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={fallbackColor}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
        <Html center>
          <div style={{ 
            color: 'white', 
            fontSize: '12px', 
            textAlign: 'center',
            background: 'rgba(0,0,0,0.8)',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Modello non trovato
          </div>
        </Html>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
};

/**
 * Preload dei modelli per performance ottimali
 */
export const preloadGLTFModels = (modelPaths: string[]) => {
  modelPaths.forEach(path => {
    try {
      useGLTF.preload(path);
    } catch (err) {
      console.warn(`Impossibile precarica il modello: ${path}`, err);
    }
  });
};

export default GLTF3DModel;
