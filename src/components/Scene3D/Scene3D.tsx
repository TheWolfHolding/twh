import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html } from '@react-three/drei';
import { ExternalModel } from '../Objects';
import { useExternalModels } from '../../hooks/useExternalModels';
import CameraController, { getAppropriateKeyframes } from '../CameraController';
import {
  FloatingParticles,
  OrbitalRings,
  BackgroundCrystals,
  GeometricCubes,
  VolumetricFog
} from '../BackgroundElements';
import {
  AtmosphericBackground,
  SpaceGrid
} from '../PostProcessing';
import './Scene3D.css';

/**
 * Loading Component - Mostra un loader durante il caricamento della scena 3D
 */
const Loading: React.FC = () => (
  <Html center>
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Caricamento esperienza 3D...</p>
    </div>
  </Html>
);

/**
 * Scene3D Component - Container principale per la scena Three.js
 * Gestisce il setup della scena, illuminazione e rendering
 */
const Scene3D: React.FC = () => {
  // Preload dei modelli esterni per performance migliori
  const models = useExternalModels(['duck', 'avocado', 'helmet', 'suzanne']);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]} // Pixel ratio per performance ottimali
        performance={{ min: 0.5 }} // Performance adaptive
      >
        {/* Illuminazione della scena */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#646cff" />
        
        {/* Ambiente HDR per riflessi realistici */}
        <Environment preset="sunset" />
        
        {/* Elementi di sfondo per profondità e atmosfera */}
        <AtmosphericBackground />
        <SpaceGrid />
        <FloatingParticles count={40} />
        <OrbitalRings />
        <BackgroundCrystals />
        <GeometricCubes />
        <VolumetricFog />
        
        {/* Camera Controller per movimento verticale con focus sui modelli */}
        <CameraController 
          keyframes={getAppropriateKeyframes()}
          smooth={0.06} // Smooth più fine per zoom precisi
          enabled={true}
        />
        
        {/* Contenuto della scena con lazy loading */}
        <Suspense fallback={<Loading />}>
          {/* Solo 2 modelli ripetuti 2 volte ciascuno */}
          
          {/* 1. Helmet - Prima Apparizione (Y: 12) */}
          <ExternalModel 
            url={models.helmet}
            position={[0, 12, 0]} 
            scale={1.2} 
            animationType="rotate"
          />
          
          {/* 2. Suzanne - Prima Apparizione (Y: 8) */}
          <ExternalModel 
            url={models.suzanne}
            position={[0, 8, 0]} 
            scale={1.5} 
            animationType="rotate"
          />
          
          {/* 3. Helmet - Seconda Apparizione (Y: 4) */}
          <ExternalModel 
            url={models.helmet}
            position={[0, 4, 0]} 
            scale={1.4} 
            animationType="orbit"
          />
          
          {/* 4. Suzanne - Seconda Apparizione (Y: 0) */}
          <ExternalModel 
            url={models.suzanne}
            position={[0, 0, 0]} 
            scale={1.8} 
            animationType="float"
          />
          
          {/* 8. Suzanne 2 - Ottavo Modello (Y: -16) */}
          <ExternalModel 
            url={models.suzanne}
            position={[0, -16, 0]} 
            scale={1.8} 
            animationType="orbit"
          />
          
          {/* 9. Duck 3 - Nono Modello (Y: -20) */}
          <ExternalModel 
            url={models.duck}
            position={[0, -20, 0]} 
            scale={0.015} 
            animationType="float"
          />
          
          {/* 10. Helmet 3 - Decimo Modello (Y: -24) */}
          <ExternalModel 
            url={models.helmet}
            position={[0, -24, 0]} 
            scale={0.8} 
            animationType="rotate"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
