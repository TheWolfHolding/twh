import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Particelle fluttuanti per creare profondità atmosferica
 */
export function FloatingParticles({ count = 50 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.children.forEach((child, index) => {
        const time = state.clock.elapsedTime;
        child.position.y += Math.sin(time * 0.5 + index) * 0.01;
        child.rotation.x += 0.002;
        child.rotation.z += 0.001;
      });
    }
  });

  const particles = Array.from({ length: count }, (_, i) => {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 100;
    const scale = Math.random() * 0.3 + 0.1;
    
    return (
      <Sphere
        key={i}
        position={[x, y, z]}
        scale={scale}
        args={[1, 8, 8]}
      >
        <meshStandardMaterial
          color={new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.5, 0.5)}
          transparent
          opacity={0.3}
          emissive={new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.3, 0.1)}
        />
      </Sphere>
    );
  });

  return <group ref={groupRef}>{particles}</group>;
}

/**
 * Anelli orbitali che creano movimento di sfondo
 */
export function OrbitalRings() {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
      ring1Ref.current.rotation.y = time * 0.1;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.15;
      ring2Ref.current.rotation.x = time * 0.05;
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.25;
      ring3Ref.current.rotation.x = -time * 0.1;
    }
  });

  return (
    <>
      {/* Anello 1 - Grande e lontano */}
      <group ref={ring1Ref} position={[0, 6, -20]}>
        <Torus args={[15, 0.5, 8, 32]}>
          <meshStandardMaterial
            color="#646cff"
            transparent
            opacity={0.2}
            emissive="#646cff"
            emissiveIntensity={0.1}
          />
        </Torus>
      </group>

      {/* Anello 2 - Medio */}
      <group ref={ring2Ref} position={[0, 6, 15]}>
        <Torus args={[10, 0.3, 6, 24]}>
          <meshStandardMaterial
            color="#ff6b6b"
            transparent
            opacity={0.15}
            emissive="#ff6b6b"
            emissiveIntensity={0.1}
          />
        </Torus>
      </group>

      {/* Anello 3 - Piccolo e vicino */}
      <group ref={ring3Ref} position={[0, 6, -5]}>
        <Torus args={[8, 0.2, 4, 16]}>
          <meshStandardMaterial
            color="#4ecdc4"
            transparent
            opacity={0.25}
            emissive="#4ecdc4"
            emissiveIntensity={0.1}
          />
        </Torus>
      </group>
    </>
  );
}

/**
 * Cristalli di sfondo che fluttuano lentamente
 */
export function BackgroundCrystals() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.05;
      
      groupRef.current.children.forEach((child, index) => {
        child.rotation.x = time * 0.1 + index;
        child.rotation.z = time * 0.08 + index * 0.5;
        child.position.y += Math.sin(time * 0.3 + index) * 0.005;
      });
    }
  });

  const crystals = [
    { position: [-25, 15, -15] as [number, number, number], scale: 1.5, color: "#8b5cf6" },
    { position: [30, 5, -25] as [number, number, number], scale: 2, color: "#06d6a0" },
    { position: [-20, -5, 20] as [number, number, number], scale: 1.2, color: "#f72585" },
    { position: [25, -10, 10] as [number, number, number], scale: 1.8, color: "#ffbe0b" },
    { position: [-15, 20, 5] as [number, number, number], scale: 1, color: "#fb8500" },
    { position: [20, -15, -10] as [number, number, number], scale: 1.4, color: "#8ecae6" }
  ];

  return (
    <group ref={groupRef}>
      {crystals.map((crystal, index) => (
        <Octahedron
          key={index}
          position={crystal.position}
          scale={crystal.scale}
          args={[1]}
        >
          <meshStandardMaterial
            color={crystal.color}
            transparent
            opacity={0.4}
            emissive={crystal.color}
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
          />
        </Octahedron>
      ))}
    </group>
  );
}

/**
 * Cubes geometrici che ruotano per creare dinamismo
 */
export function GeometricCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      groupRef.current.children.forEach((child, index) => {
        child.rotation.x = time * (0.5 + index * 0.1);
        child.rotation.y = time * (0.3 + index * 0.05);
        child.rotation.z = time * (0.2 + index * 0.08);
        
        // Movimento orbitale
        const radius = 30 + index * 5;
        const angle = time * 0.1 + index * 0.5;
        child.position.x = Math.cos(angle) * radius;
        child.position.z = Math.sin(angle) * radius;
      });
    }
  });

  const cubes = [
    { y: 18, scale: 0.8, color: "#e63946" },
    { y: 12, scale: 1.2, color: "#f77f00" },
    { y: 6, scale: 0.6, color: "#fcbf49" },
    { y: 0, scale: 1, color: "#eae2b7" },
    { y: -6, scale: 0.9, color: "#003049" },
    { y: -12, scale: 1.1, color: "#d62828" }
  ];

  return (
    <group ref={groupRef}>
      {cubes.map((cube, index) => (
        <Box
          key={index}
          position={[0, cube.y, -40]}
          scale={cube.scale}
          args={[2, 2, 2]}
        >
          <meshStandardMaterial
            color={cube.color}
            transparent
            opacity={0.6}
            emissive={cube.color}
            emissiveIntensity={0.1}
            wireframe={index % 2 === 0}
          />
        </Box>
      ))}
    </group>
  );
}

/**
 * Nebbia volumetrica per aggiungere atmosfera
 */
export function VolumetricFog() {
  const fogRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (fogRef.current) {
      const time = state.clock.elapsedTime;
      fogRef.current.rotation.y = time * 0.02;
      
      fogRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && typeof mesh.material === 'object' && 'opacity' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).opacity = 0.1 + Math.sin(time * 0.5 + index) * 0.05;
        }
        child.scale.setScalar(1 + Math.sin(time * 0.3 + index) * 0.1);
      });
    }
  });

  const fogLayers = Array.from({ length: 8 }, (_, i) => {
    const y = (i - 4) * 8;
    const scale = 15 + i * 3;
    
    return (
      <Sphere
        key={i}
        position={[0, y, -30]}
        scale={scale}
        args={[1, 16, 12]}
      >
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </Sphere>
    );
  });

  return <group ref={fogRef}>{fogLayers}</group>;
}
