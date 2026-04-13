import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP ScrollTrigger animations in React
 * Handles context creation, cleanup, and plugin registration
 */
export function useGSAPScroll(callback: (ctx: gsap.Context) => void, dependencies: React.DependencyList = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, containerRef);

    return () => {
      ctx.revert(); // Clean up all GSAP animations on unmount
    };
  }, dependencies);

  return containerRef;
}

/**
 * ScrollTrigger reveal animation preset
 * Animates element from hidden to visible on scroll
 */
export function createScrollReveal(
  target: HTMLElement | string,
  options: {
    duration?: number;
    delay?: number;
    stagger?: number | { amount: number; from: string };
    yStart?: number;
  } = {}
) {
  const { duration = 0.6, delay = 0, stagger = 0, yStart = 30 } = options;

  return {
    targets: target,
    duration,
    delay,
    stagger,
    opacity: { from: 0, to: 1 },
    y: { from: yStart, to: 0 },
    ease: 'power2.out',
  };
}

/**
 * ScrollTrigger parallax effect preset
 * Creates subtle parallax movement on scroll
 */
export function createParallax(
  target: HTMLElement | string,
  options: {
    yAmount?: number;
    scrub?: number | boolean;
    start?: string;
    end?: string;
  } = {}
) {
  const { yAmount = -40, scrub = 0.5, start = 'top 80%', end = 'top 30%' } = options;

  return {
    targets: target,
    y: yAmount,
    scrollTrigger: {
      trigger: typeof target === 'string' ? document.querySelector(target) : target,
      start,
      end,
      scrub,
      // markers: true, // Enable for debugging only
    },
    ease: 'none',
  };
}

/**
 * ScrollTrigger timeline preset for sequential animations
 */
export function createScrollTimeline(options: {
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  duration?: number;
} = {}) {
  const { trigger, start = 'top 80%', end = 'top 30%', scrub = false, duration = 1.2 } = options;

  if (!trigger) {
    return {
      duration,
    };
  }

  return {
    scrollTrigger: {
      trigger: typeof trigger === 'string' ? document.querySelector(trigger) : trigger,
      start,
      end,
      scrub,
      // markers: true, // Enable for debugging only
    } as any,
    duration,
  };
}
