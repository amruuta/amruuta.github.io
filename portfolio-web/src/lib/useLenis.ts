import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook to initialize and manage Lenis smooth scrolling with GSAP ScrollTrigger sync
 * Must be used only once at the root level (App component)
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    } as any);

    lenisRef.current = lenis;

    // Create scroll loop that syncs Lenis with GSAP ScrollTrigger
    const handleFrame = (time: number) => {
      // Update Lenis
      lenis.raf(time);

      // Update GSAP ScrollTrigger on each Lenis frame
      ScrollTrigger.update();

      // Continue animation loop
      rafIdRef.current = requestAnimationFrame(handleFrame);
    };

    // Start the animation loop
    rafIdRef.current = requestAnimationFrame(handleFrame);

    // Cleanup
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef.current;
}
