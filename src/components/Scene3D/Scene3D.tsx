import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html } from '@react-three/drei';
import { Group } from 'three';
import { FuturisticCity } from '../FuturisticCity';
import { CityTransformEffects } from '../CityTransformEffects';
import { FloatingText } from '../FloatingText';
import { ExternalModel } from '../Objects';
import { RotatingTorus } from '../Objects';
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
  const cityRef = useRef<Group>(null);

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
        {/* Illuminazione della scena più drammatica */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight 
          position={[10, 20, 5]} 
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff00ff" />
        
        {/* Ambiente HDR per riflessi realistici */}
        <Environment preset="night" />
        
        {/* Elementi di sfondo per profondità e atmosfera */}
        <AtmosphericBackground />
        <SpaceGrid />
        <FloatingParticles count={80} />
        <OrbitalRings />
        <BackgroundCrystals />
        <GeometricCubes />
        <VolumetricFog />
        
        {/* Sfondo città futuristica con ref */}
        <group ref={cityRef}>
          <FuturisticCity />
        </group>
        
        {/* Effetti di trasformazione della città */}
        <CityTransformEffects cityRef={cityRef} />
        
        {/* Camera Controller per movimento cinematografico */}
        <CameraController 
          keyframes={getAppropriateKeyframes()}
          smooth={0.04} // Movimento più fluido per il viaggio
          enabled={true}
        />
        
        {/* Contenuto della scena con lazy loading */}
        <Suspense fallback={<Loading />}>
          {/* Modelli spaziati meglio per le 6 sezioni */}
          
          {/* 0. Homepage - Modello principale rotante + Torus decorativo */}
          <ExternalModel 
            url={models.helmet}
            position={[0, 25, 0]} 
            scale={2.5} 
            animationType="rotate"
          />
          <RotatingTorus position={[8, 28, -5]} />
          
          {/* 1. Social Solutions Lab - Elemento tecnologico */}
          <ExternalModel 
            url={models.suzanne}
            position={[12, 15, 0]} 
            scale={2.2} 
            animationType="orbit"
          />
          <FloatingText
            position={[16, 18, 0]}
            text="Social Solutions Lab"
            subtext="Soluzioni Web Professionali"
            triggerStart={0.15}
            triggerEnd={0.25}
            color="#00ffff"
            size={1.0}
          />
          
          {/* 2. iHyperactive - Elemento dinamico */}
          <ExternalModel 
            url={models.duck}
            position={[-15, 5, 0]} 
            scale={0.05} 
            animationType="float"
          />
          <FloatingText
            position={[-20, 8, 0]}
            text="iHyperactive"
            subtext="Creatività Digitale Estrema"
            triggerStart={0.35}
            triggerEnd={0.45}
            color="#ff00ff"
            size={0.9}
          />
          
          {/* 3. PVRN® & Missing Clubs® - Elemento artistico */}
          <ExternalModel 
            url={models.avocado}
            position={[0, -10, 0]} 
            scale={2.8} 
            animationType="rotate"
          />
          <FloatingText
            position={[0, -6, 0]}
            text="PVRN® & Missing Clubs®"
            subtext="Universo Musicale Innovativo"
            triggerStart={0.55}
            triggerEnd={0.65}
            color="#ffff00"
            size={0.8}
          />
          
          {/* 4. EyesJuice - Elemento visuale */}
          <ExternalModel 
            url={models.helmet}
            position={[-18, -25, 0]} 
            scale={2.0} 
            animationType="float"
          />
          <FloatingText
            position={[-24, -22, 0]}
            text="EyesJuice"
            subtext="Visual Storytelling"
            triggerStart={0.72}
            triggerEnd={0.82}
            color="#00ff88"
            size={1.1}
          />
          
          {/* 5. Contatti - Elemento finale */}
          <ExternalModel 
            url={models.suzanne}
            position={[0, -40, 0]} 
            scale={2.5} 
            animationType="orbit"
          />
          <FloatingText
            position={[0, -36, 0]}
            text="Contatti"
            subtext="Iniziamo il Progetto"
            triggerStart={0.88}
            triggerEnd={0.98}
            color="#8800ff"
            size={1.2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
