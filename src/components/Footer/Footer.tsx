import React from 'react';
import './Footer.css';

/**
 * Footer Component - Footer finale del sito con informazioni del progetto
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>3D Scrollytelling</h3>
          <p>Un'esperienza immersiva creata con React e Three.js</p>
        </div>
        
        <div className="footer-section">
          <h4>Tecnologie</h4>
          <ul>
            <li>React 18 + TypeScript</li>
            <li>Three.js + React Three Fiber</li>
            <li>Vite + ESBuild</li>
            <li>GSAP ScrollTrigger</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Modelli 3D</h4>
          <ul>
            <li>Duck - Khronos GLTF Sample</li>
            <li>Avocado - Botanical model</li>
            <li>Damaged Helmet - Space theme</li>
            <li>Suzanne - Blender mascot</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Sviluppo</h4>
          <p>Progetto modulare e scalabile per esperienze web immersive.</p>
          <p className="footer-credit">
            Creato con ❤️ e molta caffeina ☕
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 3D Scrollytelling Experience. Built for the future of web.</p>
      </div>
    </footer>
  );
};

export default Footer;
