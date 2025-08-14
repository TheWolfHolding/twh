import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * RotatingTorus Component - Toro che ruota con effetto ipnotico
 * @param position - Posizione iniziale del toro [x, y, z]
 * @param color - Colore del materiale
 * @param scale - Scala del toro
 */
interface RotatingTorusProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

const RotatingTorus: React.FC<RotatingTorusProps> = ({ 
  position, 
  color = "#ff6b6b", 
  scale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);

  // Animazione continua del toro
  useFrame((state) => {
    if (meshRef.current) {
      // Rotazione su più assi per effetto ipnotico
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.015;
      meshRef.current.rotation.z += 0.01;
      
      // Movimento oscillatorio
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 2) * 0.4;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

export default RotatingTorus;
