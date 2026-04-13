/**
 * Vignette effect component
 * Creates subtle darkening at screen edges with center focus
 * Improves visual hierarchy and drawing the eye to center content
 */
export default function VignetteOverlay() {
  return (
    <>
      {/* Gradient overlay for violet glow */}
      <div className="gradient-overlay" />
      
      {/* Vignette effect - darker edges, lighter center */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 800px 600px at 50% 40%,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.15) 60%,
              rgba(0, 0, 0, 0.35) 100%
            )
          `,
          zIndex: 0,
        }}
      />
    </>
  );
}
