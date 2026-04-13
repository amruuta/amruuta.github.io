import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ConsoleLine {
  text: string;
  type: 'input' | 'output' | 'success' | 'highlight';
  delay: number;
}

const consoleLines: ConsoleLine[] = [
  { text: '> boot sequence initiated...', type: 'input', delay: 0 },
  { text: 'loading environment...', type: 'output', delay: 0.35 },
  { text: 'configuring modules...', type: 'output', delay: 0.68 },
  { text: '', type: 'output', delay: 0.95 },
  { text: '> rendering profile...', type: 'input', delay: 1.25 },
  { text: '', type: 'output', delay: 1.55 },
  { text: 'Amruta Bendale', type: 'highlight', delay: 1.8 },
  { text: 'Backend Engineer', type: 'success', delay: 2.0 },
  { text: '', type: 'output', delay: 2.2 },
  { text: '> core stack:', type: 'input', delay: 2.4 },
  { text: 'Java | Spring Boot | Kafka | AWS', type: 'output', delay: 2.58 },
  { text: '', type: 'output', delay: 2.78 },
  { text: '> system ready_', type: 'success', delay: 2.95 },
];

export default function EngineerConsole() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Natural cursor blink with slight variation
  useEffect(() => {
    let blinkDuration = 520;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
      // Slight variation every 2nd blink for natural feel
      blinkDuration = Math.random() > 0.5 ? 510 : 530;
    }, blinkDuration);
    return () => clearInterval(cursorInterval);
  }, []);

  // Reveal lines with staggered timing
  useEffect(() => {
    const timers = consoleLines.map((line, index) => {
      return setTimeout(() => {
        setDisplayedLines(index + 1);
      }, (line.delay + 0.1) * 1000);
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (consoleRef.current) {
      // Smooth scroll
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const getLineColor = (type: ConsoleLine['type']): string => {
    switch (type) {
      case 'input':
        return '#93C5FD'; // blue
      case 'success':
        return '#22C55E'; // green
      case 'highlight':
        return '#E5E7EB'; // bright white
      default:
        return '#9CA3AF'; // gray
    }
  };

  return (
    <div className="relative">
      {/* Glow behind panel */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Gradient border wrap */}
      <div
        className="relative rounded-2xl p-[1px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.2) 50%, rgba(255,255,255,0.05) 100%)',
        }}
      >
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#0F172A',
            boxShadow: '0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            height: '420px',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{
              backgroundColor: '#0d131e',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#FF5F57' }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#FEBC2E' }}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#28C840' }}
              />
            </div>
            <span
              className="text-[0.7rem] font-mono font-medium"
              style={{ color: '#4B5563' }}
            >
              engineer.console
            </span>
            <span
              className="text-[0.65rem] font-mono px-2 py-0.5 rounded"
              style={{
                backgroundColor: 'rgba(59,130,246,0.1)',
                color: '#60A5FA',
              }}
            >
              SYSTEM
            </span>
          </div>

          {/* Console output */}
          <div
            ref={consoleRef}
            className="flex-1 overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed scrollbar-hide"
            style={{
              backgroundColor: '#0F172A',
            }}
          >
            {displayedLines > 0 && (
              <div className="space-y-0">
                {consoleLines.slice(0, displayedLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    style={{
                      color: getLineColor(line.type),
                      lineHeight: '1.6',
                      minHeight: line.text === '' ? '0.8em' : 'auto',
                    }}
                  >
                    {line.text}
                  </motion.div>
                ))}
                {/* Blinking cursor on last line */}
                {displayedLines >= consoleLines.length && (
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ color: '#22C55E' }}
                  >
                    _
                  </motion.span>
                )}
              </div>
            )}
          </div>

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-5 py-2"
            style={{
              backgroundColor: '#0d131e',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              fontSize: '0.65rem',
            }}
          >
            <span className="font-mono" style={{ color: '#374151' }}>
              CONNECTED
            </span>
            <span className="font-mono" style={{ color: '#374151' }}>
              {displayedLines} / {consoleLines.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
