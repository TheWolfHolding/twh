import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * AnimatedSphere Component - Sfera con animazioni di scala e rotazione
 * @param position - Posizione iniziale della sfera [x, y, z]
 * @param color - Colore del materiale
 * @param baseScale - Scala base della sfera
 */
interface AnimatedSphereProps {
  position: [number, number, number];
  color?: string;
  baseScale?: number;
}

const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ 
  position, 
  color = "#61dafb", 
  baseScale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);

  // Animazione continua della sfera
  useFrame((state) => {
    if (meshRef.current) {
      // Pulsazione della scala
      const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.setScalar(baseScale * pulseFactor);
      
      // Rotazione lenta
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.003;
      
      // Movimento orbitale attorno alla posizione iniziale
      const radius = 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime) * radius;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime) * radius;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export default AnimatedSphere;
