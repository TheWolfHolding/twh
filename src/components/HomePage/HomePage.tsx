import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <section className="homepage-section" data-section={0}>
      <div className="homepage-content">
        <div className="homepage-header">
          <h1 className="homepage-title">TheWolfHolding</h1>
          <h2 className="homepage-subtitle">Innovazione Digitale & Creatività</h2>
        </div>
        
        <div className="homepage-body">
          <p className="homepage-description">
            Benvenuto nel futuro dell'innovazione digitale. TheWolfHolding è un ecosistema 
            di brand creativi che trasformano idee visionarie in realtà tangibili. 
            Dalla tecnologia alla musica, dal web design all'intrattenimento.
          </p>
          
          <div className="homepage-features">
            <div className="feature-card">
              <h3>🌐 Social Solutions Lab</h3>
              <p>Soluzioni web professionali</p>
            </div>
            <div className="feature-card">
              <h3>⚡ iHyperactive</h3>
              <p>Creatività digitale estrema</p>
            </div>
            <div className="feature-card">
              <h3>🎵 PVRN® & Missing Clubs®</h3>
              <p>Universo musicale innovativo</p>
            </div>
            <div className="feature-card">
              <h3>👁️ EyesJuice</h3>
              <p>Visual storytelling</p>
            </div>
          </div>
          
          <div className="scroll-hint">
            <p>Scorri verso il basso per esplorare i nostri brand</p>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
