import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, Group, MeshStandardMaterial } from 'three';

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  emissive?: string;
}

const Building: React.FC<BuildingProps> = ({ 
  position, 
  height, 
  width, 
  depth, 
  color, 
  emissive = '#000000' 
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Leggera pulsazione per gli edifici
      const pulse = Math.sin(state.clock.elapsedTime + position[0] + position[2]) * 0.1 + 1;
      const material = meshRef.current.material as MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = pulse * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial 
        color={color}
        emissive={emissive}
        emissiveIntensity={0.1}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const FuturisticCity: React.FC = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotazione lenta della città
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  // Genera edifici proceduralmente
  const buildings = [];
  const citySize = 50;
  const buildingCount = 120;

  for (let i = 0; i < buildingCount; i++) {
    const x = (Math.random() - 0.5) * citySize;
    const z = (Math.random() - 0.5) * citySize;
    const height = Math.random() * 15 + 5;
    const width = Math.random() * 3 + 1;
    const depth = Math.random() * 3 + 1;
    
    // Colori futuristici più intensi
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff88', '#8800ff'];
    const emissiveColors = ['#006666', '#660066', '#666600', '#006644', '#440066'];
    const colorIndex = Math.floor(Math.random() * colors.length);

    buildings.push(
      <Building
        key={i}
        position={[x, height / 2, z]}
        height={height}
        width={width}
        depth={depth}
        color={colors[colorIndex]}
        emissive={emissiveColors[colorIndex]}
      />
    );
  }

  return (
    <group ref={groupRef} position={[0, -15, 0]}>
      {/* Ground plane più esteso */}
      <mesh name="ground" position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[citySize * 3, citySize * 3]} />
        <meshStandardMaterial 
          color="#000011"
          emissive="#001133"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Buildings con userData per tracking */}
      {buildings.map((building, index) => 
        React.cloneElement(building, {
          key: index,
          ref: (ref: Mesh) => {
            if (ref && !ref.userData.originalPosition) {
              ref.userData.originalPosition = {
                x: ref.position.x,
                y: ref.position.y,
                z: ref.position.z
              };
            }
          }
        })
      )}
      
      {/* Atmospheric fog effect più intenso */}
      <fog attach="fog" args={[new Color('#001133'), 15, 100]} />
    </group>
  );
};

export default FuturisticCity;
