import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import gsap from 'gsap';

/**
 * CameraKeyframe - Definisce una posizione chiave della camera
 */
export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  progress: number; // 0-1, percentuale di scroll
}

/**
 * CameraController - Controlla il movimento della camera basato sullo scroll infinito
 * @param keyframes - Array di posizioni chiave della camera
 * @param smooth - Fattore di smoothing per le transizioni (0-1)
 * @param enabled - Se il controller è attivo
 */
interface CameraControllerProps {
  keyframes: CameraKeyframe[];
  smooth?: number;
  enabled?: boolean;
}

const CameraController: React.FC<CameraControllerProps> = ({ 
  keyframes, 
  smooth = 0.08, // Aumentato per transizioni più fluide e cinematografiche
  enabled = true 
}) => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const currentLookAt = useRef(new Vector3());
  const isTransitioning = useRef(false);

  // Calcola la posizione della camera basata sul progress dello scroll
  const calculateCameraPosition = (progress: number) => {
    // Gestisce il scroll infinito con wrapping fluido
    progress = ((progress % 1) + 1) % 1; // Normalizza tra 0 e 1

    // Trova i keyframe prima e dopo il progress corrente
    let beforeKeyframe = keyframes[0];
    let afterKeyframe = keyframes[keyframes.length - 1];

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (progress >= keyframes[i].progress && progress <= keyframes[i + 1].progress) {
        beforeKeyframe = keyframes[i];
        afterKeyframe = keyframes[i + 1];
        break;
      }
    }

    // Gestione speciale per il wrap-around (dalla fine all'inizio)
    if (progress >= keyframes[keyframes.length - 1].progress || progress <= keyframes[0].progress) {
      if (progress >= 0.9) {
        // Vicino alla fine, prepara per tornare all'inizio
        beforeKeyframe = keyframes[keyframes.length - 1];
        afterKeyframe = keyframes[0];
        const adjustedProgress = (progress - beforeKeyframe.progress) / (1 - beforeKeyframe.progress);
        return calculateWrapTransition(beforeKeyframe, afterKeyframe, adjustedProgress);
      } else if (progress <= 0.1) {
        // Vicino all'inizio, prepara per andare alla fine
        beforeKeyframe = keyframes[keyframes.length - 1];
        afterKeyframe = keyframes[0];
        const adjustedProgress = 1 - (0.1 - progress) / 0.1;
        return calculateWrapTransition(beforeKeyframe, afterKeyframe, adjustedProgress);
      }
    }

    // Calcola il progress locale tra i due keyframe
    const localProgress = beforeKeyframe.progress === afterKeyframe.progress 
      ? 0 
      : (progress - beforeKeyframe.progress) / (afterKeyframe.progress - beforeKeyframe.progress);

    return interpolateKeyframes(beforeKeyframe, afterKeyframe, localProgress);
  };

  // Calcola la transizione fluida per il wrap-around
  const calculateWrapTransition = (fromKeyframe: CameraKeyframe, toKeyframe: CameraKeyframe, progress: number) => {
    // Usa una curva di easing per transizioni più fluide
    const easedProgress = gsap.utils.interpolate(0, 1, progress);
    return interpolateKeyframes(fromKeyframe, toKeyframe, easedProgress);
  };

  // Interpola tra due keyframe
  const interpolateKeyframes = (beforeKeyframe: CameraKeyframe, afterKeyframe: CameraKeyframe, localProgress: number) => {
    // Interpola posizione
    const position = new Vector3(
      beforeKeyframe.position[0] + (afterKeyframe.position[0] - beforeKeyframe.position[0]) * localProgress,
      beforeKeyframe.position[1] + (afterKeyframe.position[1] - beforeKeyframe.position[1]) * localProgress,
      beforeKeyframe.position[2] + (afterKeyframe.position[2] - beforeKeyframe.position[2]) * localProgress
    );

    // Interpola target
    const target = new Vector3(
      beforeKeyframe.target[0] + (afterKeyframe.target[0] - beforeKeyframe.target[0]) * localProgress,
      beforeKeyframe.target[1] + (afterKeyframe.target[1] - beforeKeyframe.target[1]) * localProgress,
      beforeKeyframe.target[2] + (afterKeyframe.target[2] - beforeKeyframe.target[2]) * localProgress
    );

    // Interpola FOV se specificato
    const fov = beforeKeyframe.fov && afterKeyframe.fov
      ? beforeKeyframe.fov + (afterKeyframe.fov - beforeKeyframe.fov) * localProgress
      : undefined;

    return { position, target, fov };
  };

  // Gestisce lo scroll infinito
  const handleInfiniteScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const maxScroll = scrollHeight;

    // Calcola il progress base
    let progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    // Gestisce il wrap-around automatico
    if (scrollTop <= 10 && !isTransitioning.current) {
      // Scroll verso l'alto all'inizio → va alla fine
      isTransitioning.current = true;
      window.scrollTo({ 
        top: maxScroll - 50, 
        behavior: 'auto' 
      });
      setTimeout(() => { isTransitioning.current = false; }, 100);
      return;
    }

    if (scrollTop >= maxScroll - 10 && !isTransitioning.current) {
      // Scroll verso il basso alla fine → va all'inizio
      isTransitioning.current = true;
      window.scrollTo({ 
        top: 50, 
        behavior: 'auto' 
      });
      setTimeout(() => { isTransitioning.current = false; }, 100);
      return;
    }

    scrollProgress.current = progress;
  };

  // Aggiorna il progress dello scroll
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    handleInfiniteScroll(); // Chiamata iniziale

    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [enabled]);

  // Aggiorna la posizione della camera ogni frame
  useFrame(() => {
    if (!enabled || keyframes.length === 0) return;

    const { position, target, fov } = calculateCameraPosition(scrollProgress.current);

    // Smoothing ultra-fluido della posizione
    targetPosition.current.copy(position);
    camera.position.lerp(targetPosition.current, smooth);

    // Smoothing del look-at
    targetLookAt.current.copy(target);
    currentLookAt.current.lerp(targetLookAt.current, smooth);
    camera.lookAt(currentLookAt.current);

    // Aggiorna FOV se specificato
    if (fov && camera instanceof PerspectiveCamera) {
      camera.fov = gsap.utils.interpolate(camera.fov, fov, smooth);
      camera.updateProjectionMatrix();
    }
  });

  return null; // Questo componente non renderizza nulla
};

export default CameraController;
