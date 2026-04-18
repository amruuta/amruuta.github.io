import { useEffect, useRef } from 'react';

export default function AnimatedGradientBg() {
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateParallax = () => {
      frameRef.current = null;
      if (!bgRef.current) {
        return;
      }

      const offset = window.scrollY * 0.02;
      bgRef.current.style.setProperty('--bg-pos-x', `${50 + offset * 0.35}%`);
      bgRef.current.style.setProperty('--bg-pos-y', `${50 + offset * 0.2}%`);
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }
      frameRef.current = window.requestAnimationFrame(updateParallax);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax();

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="animated-gradient-bg"
      style={{
        position: 'fixed',
        top: '-20vh',
        left: 0,
        width: '100vw',
        height: '140vh',
        minHeight: '140vh',
        zIndex: 0,
        background: `linear-gradient(
          120deg,
          #EE9578,
          #F0D0A4,
          #EEA982,
          #D4A8E0,
          #BFA4D4,
          #9FB6F2,
          #EE9578
        )`,
        backgroundSize: '300% 300%',
        backgroundPosition: 'var(--bg-pos-x, 50%) var(--bg-pos-y, 50%)',
        animation: 'gradientFlow 12s ease-in-out infinite',
        willChange: 'background-position',
        pointerEvents: 'none',
      }}
    >
      {/* Soft glow overlay for premium effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
