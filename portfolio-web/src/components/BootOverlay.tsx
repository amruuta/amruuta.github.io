import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootLine {
  text: string;
  delay: number;
}

const bootSequence: BootLine[] = [
  { text: 'boot sequence initiated...', delay: 0 },
  { text: 'loading environment...', delay: 0.5 },
  { text: 'configuring modules...', delay: 1.0 },
  { text: 'rendering profile...', delay: 1.5 },
];

export default function BootOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const [readyGlow, setReadyGlow] = useState(false);
  const [systemPulse, setSystemPulse] = useState(false);
  const [readyCursor, setReadyCursor] = useState(false);

  useEffect(() => {
    // Animate boot sequence lines (runs every page load for consistent branding)
    const lineTimers = bootSequence.map((line, index) => {
      return setTimeout(() => {
        setDisplayedLines(index + 1);
        setShowCursor(index < bootSequence.length - 1);
      }, line.delay * 1000);
    });

    // Show profile after boot sequence (extended delay: 2.1s)
    const profileTimer = setTimeout(() => {
      setShowProfile(true);
      setShowCursor(false);
    }, 2.1 * 1000);

    // Show "system ready_" line (2.35s - faster appearance)
    const readyTimer = setTimeout(() => {
      setShowReady(true);
      setSystemPulse(true);
    }, 2.35 * 1000);

    // Add glow to ready line (2.4s)
    const glowTimer = setTimeout(() => {
      setReadyGlow(true);
    }, 2.4 * 1000);

    // Cursor blink after ready (2.7s)
    const readyCursorTimer = setTimeout(() => {
      setReadyCursor(true);
    }, 2.7 * 1000);

    // Remove pulse effect (2.65s)
    const unglowTimer = setTimeout(() => {
      setSystemPulse(false);
    }, 2.65 * 1000);

    // Remove glow (3.2s)
    const removeGlowTimer = setTimeout(() => {
      setReadyGlow(false);
    }, 3.2 * 1000);

    // Fade out overlay (3.5s)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3.5 * 1000);

    return () => {
      lineTimers.forEach((timer) => clearTimeout(timer));
      clearTimeout(profileTimer);
      clearTimeout(readyTimer);
      clearTimeout(glowTimer);
      clearTimeout(readyCursorTimer);
      clearTimeout(unglowTimer);
      clearTimeout(removeGlowTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Animated background with subtle gradient motion */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{
              background: 'linear-gradient(-45deg, rgba(30, 58, 138, 0.03), rgba(59, 130, 246, 0.02), rgba(12, 74, 110, 0.02))',
              backgroundSize: '200% 200%',
            }}
          />

          {/* Backdrop blur + dark overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(12px)' }}
            exit={{ backdropFilter: 'blur(2px)', transition: { duration: 0.5 } }}
            style={{
              backgroundColor: 'rgba(11, 15, 25, 0.8)',
            }}
          />

          {/* Focus light effect (radial glow) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              opacity: systemPulse ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle 600px at 50% 50%, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.04), transparent)',
            }}
          />

          {/* Vignette overlay (edge darkening) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
            }}
          />

          {/* Centered content */}
          <motion.div
            className="relative z-10 text-center px-6 max-w-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.5 } }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {/* Boot sequence */}
            <div className="font-mono text-base md:text-lg space-y-3.5 mb-10">
              {bootSequence.slice(0, displayedLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                    delay: index * 0.05,
                  }}
                  style={{ color: '#60A5FA' }}
                  className="leading-normal"
                >
                  &gt; {line.text}
                </motion.div>
              ))}

              {/* Cursor */}
              {showCursor && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ color: '#60A5FA' }}
                  className="text-lg"
                >
                  _
                </motion.span>
              )}
            </div>

            {/* Profile section */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-2 mb-8"
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: '#F0F0F0' }}
                >
                  Amruta Bendale
                </motion.h2>
                <motion.p
                  className="text-lg font-medium"
                  style={{ color: '#A3A3A3' }}
                >
                  Backend Engineer
                </motion.p>
              </motion.div>
            )}

            {/* System ready with green glow */}
            {showReady && (
              <motion.div
                className="font-mono text-base md:text-lg"
                initial={{ opacity: 0, y: 4, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <motion.div
                  style={{
                    color: readyGlow ? '#22C55E' : '#60A5FA',
                    textShadow: readyGlow
                      ? '0 0 12px rgba(34, 197, 94, 0.6), 0 0 24px rgba(34, 197, 94, 0.3)'
                      : 'none',
                  }}
                  transition={{ all: '0.3s cubic-bezier(0.4, 0, 0.2, 1)' } as any}
                >
                  &gt; system ready
                  {readyCursor && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ color: readyGlow ? '#22C55E' : '#60A5FA' }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
