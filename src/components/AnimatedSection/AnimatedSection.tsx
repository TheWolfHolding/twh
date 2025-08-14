import React, { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useGSAPAnimations } from '../../hooks/useGSAPAnimations';
import './AnimatedSection.css';

interface AnimatedSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  details?: {
    title: string;
    content: string | string[];
  };
  backgroundColor?: string;
  height?: string;
  sectionIndex?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  title,
  subtitle,
  description,
  details,
  backgroundColor = 'rgba(255, 255, 255, 0.05)',
  height = '100vh',
  sectionIndex = 0
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  const { elementRef, hasBeenVisible } = useIntersectionObserver(0.3, '-10% 0px -10% 0px');
  const { animateIn, animateText, morphElement } = useGSAPAnimations();

  // Combina i ref
  const combinedRef = (el: HTMLElement | null) => {
    if (elementRef) elementRef.current = el;
    if (sectionRef) sectionRef.current = el;
  };

  useEffect(() => {
    if (hasBeenVisible && sectionRef.current) {
      // Anima l'entrata della sezione principale
      animateIn(sectionRef.current, {
        duration: 1.5,
        direction: sectionIndex % 2 === 0 ? 'left' : 'right',
        delay: 0.2
      });

      // Anima il titolo con effetto typewriter
      if (titleRef.current) {
        setTimeout(() => {
          animateText(titleRef.current!, {
            splitBy: 'chars',
            stagger: 0.03,
            duration: 1
          });
        }, 400);
      }

      // Anima il subtitle
      if (subtitleRef.current) {
        setTimeout(() => {
          animateIn(subtitleRef.current!, {
            duration: 1,
            direction: 'up',
            delay: 0
          });
        }, 600);
      }

      // Anima la descrizione
      if (descriptionRef.current) {
        setTimeout(() => {
          animateIn(descriptionRef.current!, {
            duration: 1.2,
            direction: 'up',
            delay: 0
          });
        }, 800);
      }

      // Anima i dettagli
      if (detailsRef.current) {
        setTimeout(() => {
          animateIn(detailsRef.current!, {
            duration: 1,
            direction: 'up',
            scale: true,
            delay: 0
          });
        }, 1200);
      }
    }
  }, [hasBeenVisible, sectionIndex, animateIn, animateText]);

  // Effetto hover per la sezione
  const handleMouseEnter = () => {
    if (sectionRef.current) {
      morphElement(sectionRef.current, {
        scale: 1.02,
        filter: 'brightness(1.1)'
      }, 0.3);
    }
  };

  const handleMouseLeave = () => {
    if (sectionRef.current) {
      morphElement(sectionRef.current, {
        scale: 1,
        filter: 'brightness(1)'
      }, 0.3);
    }
  };

  return (
    <section 
      ref={combinedRef}
      className={`animated-section ${hasBeenVisible ? 'visible' : ''}`}
      style={{ 
        height, 
        padding: '4rem 2rem',
        opacity: 0 // Inizia invisibile per GSAP
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="section-content"
        style={{ 
          textAlign: 'center', 
          paddingTop: '40vh', 
          maxWidth: '700px', 
          margin: '0 auto'
        }}
      >
        <h2 ref={titleRef} className="section-title" style={{ opacity: 0 }}>
          {title}
        </h2>
        
        {subtitle && (
          <h3 ref={subtitleRef} className="section-subtitle" style={{ opacity: 0 }}>
            {subtitle}
          </h3>
        )}
        
        <p ref={descriptionRef} className="section-description" style={{ opacity: 0 }}>
          {description}
        </p>
        
        {details && (
          <div 
            ref={detailsRef}
            className="section-details" 
            style={{ 
              opacity: 0,
              padding: '2rem', 
              background: backgroundColor, 
              borderRadius: '15px', 
              margin: '3rem 0',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            <h4>{details.title}</h4>
            {Array.isArray(details.content) ? (
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
                {details.content.map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '1.1rem' }}>{details.content}</p>
            )}
          </div>
        )}
        
        {/* Indicatore di sezione con animazione */}
        <div className="section-indicator" style={{ opacity: 0.7 }}>
          <span className="section-number">{String(sectionIndex + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
};

export default AnimatedSection;
