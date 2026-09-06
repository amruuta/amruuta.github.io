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
    // Wide, gentle framing — takes the camera lean at full strength.
    reactScale: 1,
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
    // At 9.1x zoom the same angle delta sweeps a lot more of the frame, so the
    // lean is scaled well down to stay subtle rather than lurching.
    reactScale: 0.28,
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
  // Tracked per theme and never reset once true: each shader instance stays
  // mounted for the component's whole lifetime (see below), so once a theme
  // has loaded, re-visiting it is instant — no re-init, no gap.
  const [readyLight, setReadyLight] = useState(false);
  const [readyDark, setReadyDark] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!hasWebGL()) return;
    // Kick the shader chunk off straight away. Waiting for requestIdleCallback
    // held it back ~1.5s, which meant the fallback sat on screen long enough to
    // read as "a different background that then changed".
    setEnabled(true);
  }, []);

  const ready = isDark ? readyDark : readyLight;

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
      {/* Base layer — paints instantly and is what shows if WebGL is missing,
          or before the *current* theme's shader has loaded even once. Light's
          shader is a wide, smooth, grain-free sweep, so a matched static
          gradient reads as "the same background" during that handover. Dark's
          shader is heavily grained and a tight zoomed blob, so its stand-in
          pairs a matching radial mass with a grain overlay — a flat colour
          there just read as a blank void while three.js downloaded. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? // Was flat #0F0F0F, which meant a fresh dark load showed a blank
              // void for the ~2.5s the shader took to arrive. This mirrors the
              // dark waterPlane's actual composition — near-black field with
              // the purple-blue mass low and left — so the wait looks like the
              // background rather than like nothing. Grain is layered over it
              // below, since that texture is most of what the dark shader is.
              'radial-gradient(115% 85% at 16% 82%, #3d3480 0%, #241f52 30%, #14121f 58%, #0d0d12 100%)'
            : // orange-red mass low and left, easing to muted violet upper-right
              // — the waterPlane's composition, not just its average colour
              'radial-gradient(140% 110% at 10% 90%, #e8490c 0%, #de4d22 38%, #c85a40 66%, #a56a62 86%, #8e6d78 100%)',
          opacity: ready ? 0 : 1,
          transition: 'opacity 420ms ease-out',
        }}
      />

      {/* Grain, dark only. The dark shader's defining texture is its noise, so
          without this the stand-in reads as a flat gradient rather than as the
          same surface. SVG turbulence keeps it to a data URI — no asset. */}
      {isDark && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            opacity: ready ? 0 : 0.22,
            mixBlendMode: 'overlay',
            transition: 'opacity 420ms ease-out',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Both waterPlanes are mounted together and never torn down — only one
          is ever visible, picked by opacity. Re-keying this on theme (as an
          earlier version did) unmounted and re-initialised WebGL on every
          switch, which is real work and produced a visible black gap each
          time. Keeping both alive means a switch is just a CSS opacity flip:
          instant once each side has loaded once. The cost is a second live
          WebGL context idling off-screen — worth it for a toggle that's
          supposed to feel immediate. */}
      {enabled && (
        <Suspense fallback={null}>
          <div
            style={{
              position: 'absolute',
              ...CONFIG.light.overscan,
              opacity: !isDark && readyLight ? 1 : 0,
              transition: 'opacity 420ms ease-out',
            }}
          >
            <ShaderBackdrop
              config={CONFIG.light}
              animate={!reduce}
              onReady={() => setReadyLight(true)}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              ...CONFIG.dark.overscan,
              opacity: isDark && readyDark ? 1 : 0,
              transition: 'opacity 420ms ease-out',
            }}
          >
            <ShaderBackdrop
              config={CONFIG.dark}
              animate={!reduce}
              onReady={() => setReadyDark(true)}
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
