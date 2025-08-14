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
          The Wolf Holding
          <span className="hero-accent"> Group</span>
        </h1>
        <p className="hero-subtitle">
          Innovazione digitale e creatività senza confini.
          Scopri i nostri brand e servizi attraverso un'esperienza 3D immersiva e coinvolgente!
        </p>
        <div className="hero-cta">
          <p className="scroll-hint">↓ Scrolla per esplorare i nostri servizi</p>
          <p className="infinite-hint">🚀 Un viaggio infinito attraverso l'innovazione</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
