import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * FloatingCube Component - Cubo animato che ruota e fluttua
 * @param position - Posizione iniziale del cubo [x, y, z]
 * @param color - Colore del materiale
 * @param scale - Scala del cubo
 */
interface FloatingCubeProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

const FloatingCube: React.FC<FloatingCubeProps> = ({ 
  position, 
  color = "#646cff", 
  scale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);

  // Animazione continua del cubo
  useFrame((state) => {
    if (meshRef.current) {
      // Rotazione continua
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      // Movimento fluttuante verticale
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      
      // Leggero movimento orizzontale
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

export default FloatingCube;
