import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook personalizzato per animazioni GSAP con ScrollTrigger
 * Gestisce animazioni sincronizzate con lo scroll per elementi UI
 */
export const useGSAPAnimations = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Configura animazioni globali GSAP
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    });

    // Timeline principale per animazioni coordinate
    timelineRef.current = gsap.timeline({
      paused: true
    });

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  /**
   * Anima l'entrata di un elemento con effetti fluidi
   */
  const animateIn = (element: HTMLElement, options: {
    duration?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    scale?: boolean;
    fade?: boolean;
  } = {}) => {
    const {
      duration = 1.2,
      delay = 0,
      direction = 'up',
      scale = true,
      fade = true
    } = options;

    const fromProps: any = {};
    
    if (fade) fromProps.opacity = 0;
    if (scale) fromProps.scale = 0.8;
    
    switch (direction) {
      case 'up':
        fromProps.y = 60;
        break;
      case 'down':
        fromProps.y = -60;
        break;
      case 'left':
        fromProps.x = -60;
        break;
      case 'right':
        fromProps.x = 60;
        break;
    }

    return gsap.fromTo(element, fromProps, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      clearProps: "all"
    });
  };

  /**
   * Crea un'animazione ScrollTrigger per sezioni
   */
  const createScrollAnimation = (
    element: HTMLElement,
    options: {
      trigger?: HTMLElement;
      start?: string;
      end?: string;
      scrub?: boolean | number;
      onEnter?: () => void;
      onLeave?: () => void;
    } = {}
  ) => {
    const {
      trigger = element,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      onEnter,
      onLeave
    } = options;

    return ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub,
      onEnter: () => {
        animateIn(element);
        onEnter?.();
      },
      onLeave: () => {
        onLeave?.();
      }
    });
  };

  /**
   * Anima elementi parallax basati sullo scroll
   */
  const createParallaxAnimation = (
    elements: HTMLElement[],
    speed: number = 0.5
  ) => {
    elements.forEach(element => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  };

  /**
   * Anima la comparsa di testo con effetto typewriter
   */
  const animateText = (
    element: HTMLElement,
    options: {
      splitBy?: 'chars' | 'words' | 'lines';
      stagger?: number;
      duration?: number;
    } = {}
  ) => {
    const { splitBy = 'chars', stagger = 0.02, duration = 0.8 } = options;
    
    // Suddivide il testo in elementi animabili
    const text = element.textContent || '';
    const splitText = splitBy === 'chars' ? text.split('') : 
                     splitBy === 'words' ? text.split(' ') :
                     [text];

    element.innerHTML = splitText.map((char) => 
      `<span style="opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const spans = element.querySelectorAll('span');
    
    return gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out"
    });
  };

  /**
   * Crea effetti di morphing fluidi
   */
  const morphElement = (
    element: HTMLElement,
    targetState: any,
    duration: number = 1
  ) => {
    return gsap.to(element, {
      ...targetState,
      duration,
      ease: "power3.inOut"
    });
  };

  return {
    animateIn,
    createScrollAnimation,
    createParallaxAnimation,
    animateText,
    morphElement,
    timeline: timelineRef.current
  };
};

export default useGSAPAnimations;
