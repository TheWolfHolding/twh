import React from 'react';
import './Hero.css';

/**
 * Hero Component - Hero section con titolo e sottotitolo sopra la scena 3D
 * Questo componente si trova sopra la scena 3D e introduce il sito
 */
const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          3D Scrollytelling
          <span className="hero-accent"> Experience</span>
        </h1>
        <p className="hero-subtitle">
          Immergiti in un universo 3D ricco di atmosfera e profondità.
          Scorri per navigare attraverso cristalli fluttuanti, anelli orbitali e nebbie volumetriche in un viaggio infinito!
        </p>
        <div className="hero-cta">
          <p className="scroll-hint">↓ Scrolla per esplorare l'universo 3D</p>
          <p className="infinite-hint">🌌 Atmosfera spaziale con elementi di sfondo dinamici</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
