import { Suspense, lazy, useEffect, useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import type { ShaderConfig } from './ShaderBackdrop';

// three.js is heavy, so the shader lives in its own chunk and loads after the
// page is interactive. Until it's ready (or if WebGL isn't available at all)
// the CSS gradient below stays on screen, so there's never a blank backdrop.
const ShaderBackdrop = lazy(() => import('./ShaderBackdrop'));

// Each theme gets its own full waterPlane setup — they differ in camera,
// rotation and wave motion, not just colour.
const CONFIG: Record<'light' | 'dark', ShaderConfig> = {
  // Warm sweep using the site's original gradient stops.
  light: {
    color1: '#D4623E', // terracotta
    color2: '#A96EC4', // violet
    color3: '#5F7ED4', // blue
    // The preset's 1.1 blows the warm stops out to neon; dialling it back
    // keeps the softer terracotta the page had before.
    brightness: 0.92,
    grain: 'off',
    cAzimuthAngle: 180,
    cPolarAngle: 115,
    cDistance: 3.9,
    cameraZoom: 1,
    positionX: -0.5,
    positionY: 0.1,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 235,
    uAmplitude: 0,
    uDensity: 1.1,
    uFrequency: 5.5,
    uSpeed: 0.1,
    uStrength: 2.4,
    uTime: 0.2,
    reflection: 0.1,
    // This framing puts the plane's horizon near the bottom of the canvas, so
    // it needs generous overscan to push that edge off-screen.
    overscan: { top: '-20%', bottom: '-35%', left: '-8%', right: '-8%' },
  },
  // Muted slate/lavender, zoomed right into the surface.
  dark: {
    color1: '#606080',
    color2: '#8d7dca',
    color3: '#212121',
    brightness: 1,
    grain: 'on',
    cAzimuthAngle: 180,
    cPolarAngle: 80,
    cDistance: 2.8,
    cameraZoom: 9.1,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 50,
    rotationY: 0,
    rotationZ: -60,
    uAmplitude: 0,
    uDensity: 1.5,
    uFrequency: 0,
    uSpeed: 0.3,
    uStrength: 1.5,
    uTime: 8,
    reflection: 0.1,
    // Zoomed to 9.1, so the plane already fills the frame — only a small
    // margin is needed.
    overscan: { top: '-4%', bottom: '-4%', left: '-4%', right: '-4%' },
  },
};

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function AnimatedGradientBg() {
  const { isDark } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!hasWebGL()) return;
    // Defer mounting until the browser is idle so the shader chunk never
    // competes with the initial render.
    const idle = (window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (idle) {
      const id = idle(() => setEnabled(true), { timeout: 2000 });
      return () => (window as unknown as { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setEnabled(true), 400);
    return () => clearTimeout(t);
  }, []);

  const config = isDark ? CONFIG.dark : CONFIG.light;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Base layer — the original CSS gradient. Paints instantly, and stays
          visible underneath as the shader's fallback. */}
      <div
        className="animated-gradient-bg"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            120deg,
            var(--animated-gradient-stop-1, #D4623E),
            var(--animated-gradient-stop-2, #D4A85C),
            var(--animated-gradient-stop-3, #D07A48),
            var(--animated-gradient-stop-4, #A96EC4),
            var(--animated-gradient-stop-5, #8A6AAF),
            var(--animated-gradient-stop-6, #5F7ED4),
            var(--animated-gradient-stop-1, #D4623E)
          )`,
          backgroundSize: 'var(--animated-gradient-size, 300%) var(--animated-gradient-size, 300%)',
          backgroundPosition: '50% 50%',
          animation: 'gradientFlow var(--animated-gradient-duration, 30s) ease-in-out infinite',
          willChange: 'background-position',
        }}
      />

      {/* WebGL waterPlane, faded in once it has actually drawn a frame. */}
      {enabled && (
        <Suspense fallback={null}>
          <div
            style={{
              position: 'absolute',
              // Overscanned past the viewport so the plane's own edge falls
              // off-screen instead of showing as a seam. How much is needed
              // depends on the framing, so it comes from the theme's config.
              ...config.overscan,
              opacity: ready ? 1 : 0,
              transition: 'opacity 900ms ease-out',
            }}
          >
            <ShaderBackdrop
              // Remount on theme change so the shader picks up the new
              // camera/rotation cleanly rather than tweening between framings.
              key={isDark ? 'dark' : 'light'}
              config={config}
              animate={!reduce}
              onReady={() => setReady(true)}
            />
          </div>
        </Suspense>
      )}

      {/* Soft glow overlay, kept from the original for depth. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
