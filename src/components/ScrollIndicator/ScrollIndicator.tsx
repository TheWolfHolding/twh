import React, { useState, useEffect } from 'react';
import './ScrollIndicator.css';

/**
 * ScrollIndicator - Mostra il progresso dello scroll infinito e debug info
 * @param showDebug - Se mostrare informazioni di debug
 */
interface ScrollIndicatorProps {
  showDebug?: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ showDebug = false }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isNearTop, setIsNearTop] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScrollHeight > 0 ? currentScrollTop / currentScrollHeight : 0;
      
      // Rileva se siamo vicini al top o al bottom per il loop infinito
      const nearTop = currentScrollTop <= 50;
      const nearBottom = currentScrollTop >= currentScrollHeight - 50;
      
      setScrollTop(currentScrollTop);
      setScrollHeight(currentScrollHeight);
      setScrollProgress(progress);
      setIsNearTop(nearTop);
      setIsNearBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Chiamata iniziale

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-indicator">
      {/* Barra di progresso infinito */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      {/* Indicatori di loop infinito */}
      {isNearTop && (
        <div className="loop-indicator top">
          ↑ Scrolla ancora per andare alla fine
        </div>
      )}
      
      {isNearBottom && (
        <div className="loop-indicator bottom">
          ↓ Scrolla ancora per tornare all'inizio
        </div>
      )}
      
      {/* Informazioni di debug */}
      {showDebug && (
        <div className="debug-info">
          <div>Progress: {(scrollProgress * 100).toFixed(1)}%</div>
          <div>Scroll: {scrollTop.toFixed(0)}px</div>
          <div>Height: {scrollHeight.toFixed(0)}px</div>
          <div>Near Top: {isNearTop ? 'Yes' : 'No'}</div>
          <div>Near Bottom: {isNearBottom ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
};

export default ScrollIndicator;
