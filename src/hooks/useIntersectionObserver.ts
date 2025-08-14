import { useState, useEffect, useRef } from 'react';

/**
 * Hook per rilevare quando un elemento è visibile nel viewport
 * @param threshold - Percentuale di visibilità richiesta (0-1)
 * @param rootMargin - Margine aggiuntivo per il trigger
 */
export const useIntersectionObserver = (
  threshold: number = 0.3,
  rootMargin: string = '0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        // Una volta che è stato visibile, rimane true
        if (isVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]);

  return { elementRef, isIntersecting, hasBeenVisible };
};

/**
 * Hook per rilevare la posizione di scroll e determinare la sezione attiva
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      setScrollProgress(progress);
      
      // Calcola la sezione attiva basata sul progress (6 sezioni totali)
      const sectionIndex = Math.floor(progress * 6);
      setActiveSection(Math.min(sectionIndex, 5));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, activeSection };
};
