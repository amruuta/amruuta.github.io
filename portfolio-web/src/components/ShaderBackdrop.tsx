import { useEffect } from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

// The waterPlane shader itself. Kept in its own module so Vite code-splits
// three.js / react-three-fiber into a separate chunk — AnimatedGradientBg
// lazy-loads it, so the heavy WebGL bundle never blocks first paint.
//
// Note: bgColor1/bgColor2 aren't exposed as props in this version of the
// library, so anything the plane doesn't cover falls through to the CSS
// gradient rendered underneath.

export interface ShaderConfig {
  color1: string;
  color2: string;
  color3: string;
  brightness: number;
  grain: 'on' | 'off';
  // camera / framing
  cAzimuthAngle: number;
  cPolarAngle: number;
  cDistance: number;
  cameraZoom: number;
  // plane placement
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  // wave motion
  uAmplitude: number;
  uDensity: number;
  uFrequency: number;
  uSpeed: number;
  uStrength: number;
  uTime: number;
  reflection: number;
  /** How far past the viewport to overscan, hiding the plane's own edge. */
  overscan: { top: string; bottom: string; left: string; right: string };
}

interface ShaderBackdropProps {
  config: ShaderConfig;
  /** Freeze the wave motion for reduced-motion users. */
  animate: boolean;
  onReady?: () => void;
}

export default function ShaderBackdrop({ config, animate, onReady }: ShaderBackdropProps) {
  // Give the canvas a couple of frames to paint before the parent fades it in,
  // so we never cross-fade to an empty canvas.
  useEffect(() => {
    const t = setTimeout(() => onReady?.(), 180);
    return () => clearTimeout(t);
  }, [onReady]);

  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      pixelDensity={1}
      fov={45}
      pointerEvents="none"
    >
      <ShaderGradient
        control="props"
        animate={animate ? 'on' : 'off'}
        type="waterPlane"
        shader="defaults"
        color1={config.color1}
        color2={config.color2}
        color3={config.color3}
        cAzimuthAngle={config.cAzimuthAngle}
        cPolarAngle={config.cPolarAngle}
        cDistance={config.cDistance}
        cameraZoom={config.cameraZoom}
        positionX={config.positionX}
        positionY={config.positionY}
        positionZ={config.positionZ}
        rotationX={config.rotationX}
        rotationY={config.rotationY}
        rotationZ={config.rotationZ}
        uAmplitude={config.uAmplitude}
        uDensity={config.uDensity}
        uFrequency={config.uFrequency}
        uSpeed={config.uSpeed}
        uStrength={config.uStrength}
        uTime={config.uTime}
        brightness={config.brightness}
        reflection={config.reflection}
        lightType="3d"
        envPreset="city"
        grain={config.grain}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  );
}
