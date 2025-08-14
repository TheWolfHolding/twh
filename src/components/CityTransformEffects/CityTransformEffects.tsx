import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { useScrollProgress } from '../../hooks/useIntersectionObserver';

interface CityTransformEffectsProps {
  cityRef: React.RefObject<Group | null>;
}

const CityTransformEffects: React.FC<CityTransformEffectsProps> = ({ cityRef }) => {
  const { scrollProgress } = useScrollProgress();
  
  useFrame(() => {
    if (!cityRef.current) return;
    
    const city = cityRef.current;
    
    // Calcola l'effetto di scomposizione basato sul progresso di scroll
    const decompositionZones = [
      { start: 0.12, end: 0.28, intensity: 1.2 }, // Social Solutions Lab - zona più ampia
      { start: 0.32, end: 0.48, intensity: 1.5 }, // iHyperactive - effetto più intenso
      { start: 0.52, end: 0.68, intensity: 1.0 }, // PVRN & Missing Clubs
      { start: 0.70, end: 0.85, intensity: 1.3 }, // EyesJuice - zona estesa
      { start: 0.86, end: 0.98, intensity: 1.1 }  // Contatti - finale drammatico
    ];
    
    let currentDecomposition = 0;
    
    // Verifica se siamo in una zona di scomposizione
    for (const zone of decompositionZones) {
      if (scrollProgress >= zone.start && scrollProgress <= zone.end) {
        const zoneProgress = (scrollProgress - zone.start) / (zone.end - zone.start);
        // Curva di scomposizione: picco a metà, poi ritorna normale
        const decompositionCurve = Math.sin(zoneProgress * Math.PI) * zone.intensity;
        currentDecomposition = decompositionCurve;
        break;
      }
    }
    
    // Applica l'effetto di scomposizione a tutti gli edifici
    city.children.forEach((child, index) => {
      if (child instanceof Mesh && child.name !== 'ground') {
        const randomOffset = index * 0.1;
        const disperseRadius = currentDecomposition * 15;
        
        // Movimento casuale per ogni edificio durante la scomposizione
        const disperseX = Math.sin(randomOffset) * disperseRadius;
        const disperseY = Math.cos(randomOffset * 1.5) * disperseRadius * 0.5;
        const disperseZ = Math.cos(randomOffset) * disperseRadius;
        
        // Applica la posizione con smooth interpolation
        const targetX = child.userData.originalPosition?.x + disperseX || disperseX;
        const targetY = child.userData.originalPosition?.y + disperseY || disperseY;
        const targetZ = child.userData.originalPosition?.z + disperseZ || disperseZ;
        
        child.position.x += (targetX - child.position.x) * 0.1;
        child.position.y += (targetY - child.position.y) * 0.1;
        child.position.z += (targetZ - child.position.z) * 0.1;
        
        // Rotazione durante la scomposizione
        child.rotation.x += currentDecomposition * 0.02;
        child.rotation.z += currentDecomposition * 0.015;
        
        // Scala gli edifici durante la scomposizione
        const scaleEffect = 1 + currentDecomposition * 0.3;
        child.scale.setScalar(scaleEffect);
      }
    });
    
    // Effetto generale sulla città
    city.rotation.y += currentDecomposition * 0.005;
  });
  
  return null;
};

export default CityTransformEffects;
