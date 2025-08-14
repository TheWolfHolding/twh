import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '../../hooks/useIntersectionObserver';
import './HiddenSection.css';

interface HiddenSectionProps {
  children: React.ReactNode;
  triggerStart: number;
  triggerEnd: number;
  className?: string;
}

const HiddenSection: React.FC<HiddenSectionProps> = ({
  children,
  triggerStart,
  triggerEnd,
  className = ''
}) => {
  const { scrollProgress } = useScrollProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const inRange = scrollProgress >= triggerStart && scrollProgress <= triggerEnd;
    setIsVisible(inRange);
    
    if (inRange) {
      // Fade in veloce quando entra nel range
      const rangeProgress = (scrollProgress - triggerStart) / (triggerEnd - triggerStart);
      const fadeEffect = Math.min(rangeProgress * 4, 1); // Fade in veloce
      setOpacity(fadeEffect);
    } else {
      setOpacity(0);
    }
  }, [scrollProgress, triggerStart, triggerEnd]);

  return (
    <div 
      className={`hidden-section ${className}`}
      style={{
        opacity,
        pointerEvents: isVisible ? 'auto' : 'none',
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transition: 'transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default HiddenSection;
