import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';
import { useScrollProgress } from '../../hooks/useIntersectionObserver';

interface FloatingTextProps {
  position: [number, number, number];
  text: string;
  subtext?: string;
  triggerStart: number;
  triggerEnd: number;
  color?: string;
  size?: number;
}

const FloatingText: React.FC<FloatingTextProps> = ({
  position,
  text,
  subtext,
  triggerStart,
  triggerEnd,
  color = '#00ffff',
  size = 1
}) => {
  const groupRef = useRef<Group>(null);
  const { scrollProgress } = useScrollProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const inRange = scrollProgress >= triggerStart && scrollProgress <= triggerEnd;
    setIsVisible(inRange);
    
    if (inRange) {
      // Calcola l'opacità basata sulla posizione nel range
      const rangeProgress = (scrollProgress - triggerStart) / (triggerEnd - triggerStart);
      const fadeInOut = Math.sin(rangeProgress * Math.PI); // Fade in e out
      setOpacity(fadeInOut);
    } else {
      setOpacity(0);
    }
  }, [scrollProgress, triggerStart, triggerEnd]);

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      // Fluttuazione leggera
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      
      // Guarda sempre verso la camera
      groupRef.current.lookAt(state.camera.position);
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Testo principale */}
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        material-transparent
        material-opacity={opacity}
      >
        {text}
      </Text>
      
      {/* Sottotesto */}
      {subtext && (
        <Text
          position={[0, -0.8, 0]}
          fontSize={size * 0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          material-transparent
          material-opacity={opacity * 0.8}
        >
          {subtext}
        </Text>
      )}
      
      {/* Effetto glow di sfondo */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[text.length * 0.8 * size, 1.5 * size]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.1}
        />
      </mesh>
    </group>
  );
};

export default FloatingText;
