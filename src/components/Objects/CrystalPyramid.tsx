import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * CrystalPyramid Component - Piramide cristallina con effetti di luce
 * @param position - Posizione iniziale della piramide [x, y, z]
 * @param color - Colore del materiale
 * @param scale - Scala della piramide
 */
interface CrystalPyramidProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

const CrystalPyramid: React.FC<CrystalPyramidProps> = ({ 
  position, 
  color = "#9d4edd", 
  scale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);

  // Animazione continua della piramide
  useFrame((state) => {
    if (meshRef.current) {
      // Rotazione elegante
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Movimento verticale lento
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.25;
      
      // Variazione della scala per effetto "respirazione"
      const breatheFactor = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale * breatheFactor);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <coneGeometry args={[1, 2, 8]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

export default CrystalPyramid;
