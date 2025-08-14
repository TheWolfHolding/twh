import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Shader personalizzato per effetti atmosferici
 */
export const AtmosphereShader = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    color1: { value: new THREE.Color('#646cff') },
    color2: { value: new THREE.Color('#4ecdc4') },
    opacity: { value: 0.3 }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float opacity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Gradiente animato
      float gradient = sin(uv.y * 3.14159 + time * 0.5) * 0.5 + 0.5;
      
      // Noise per variazione
      float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 15.0 + time * 0.7) * 0.1;
      
      // Mix dei colori
      vec3 color = mix(color1, color2, gradient + noise);
      
      gl_FragColor = vec4(color, opacity);
    }
  `
};

/**
 * Piano di sfondo con shader atmosferico
 */
export function AtmosphericBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]} scale={[100, 60, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        {...AtmosphereShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Griglia spaziale di sfondo
 */
export function SpaceGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.position.z = -60 + Math.sin(state.clock.elapsedTime * 0.05) * 5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -60]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200, 50, 50]} />
      <meshStandardMaterial
        color="#646cff"
        transparent
        opacity={0.1}
        wireframe
        emissive="#646cff"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}
