import { useState, useEffect, useRef, useCallback } from 'react';

interface TerminalLine {
  id: string;
  text: string;
  color: 'default' | 'success' | 'highlight' | 'subtitle';
}

// Boot phase lines
const BOOT_LINES: TerminalLine[] = [
  { id: 'boot-1', text: '> boot sequence initiated...', color: 'default' },
  { id: 'boot-2', text: '> loading modules...', color: 'default' },
  { id: 'boot-3', text: '> initializing runtime...', color: 'default' },
  { id: 'boot-4', text: '> rendering profile...', color: 'default' },
  { id: 'boot-5', text: '> system ready_', color: 'success' },
];

// Final identity lines
const IDENTITY_LINES: TerminalLine[] = [
  { id: 'identity-1', text: '> Hi! I am', color: 'default' },
  { id: 'identity-2', text: 'AMRUTA BENDALE', color: 'highlight' },
  { id: 'identity-3', text: '> Backend Engineer', color: 'subtitle' },
];

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  const isRunningRef = useRef(false);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const getLineColor = useCallback((color: TerminalLine['color']): string => {
    switch (color) {
      case 'success':
        return '#22C55E';
      case 'highlight':
        return '#000000';
      case 'subtitle':
        return '#666666';
      default:
        return '#000000';
    }
  }, []);

  const getLineStyle = useCallback((color: TerminalLine['color'], lineId: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontFamily: 'Fira Code, Courier New, monospace',
      color: getLineColor(color),
      fontSize: '0.95rem',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    };

    if (color === 'highlight') {
      return {
        ...baseStyle,
        fontSize: '1.75rem',
        fontWeight: '700',
        letterSpacing: '0.12em',
        animation: 'glowPulseScale 2.5s ease-in-out',
        margin: '0.3rem 0',
        position: 'relative',
        textAlign: 'left',
        color: '#000000',
        textShadow: '0 0 6px rgba(37, 99, 235, 0.2)',
        paddingBottom: '0.5rem',
        paddingLeft: '0',
      };
    }

    if (color === 'subtitle') {
      return {
        ...baseStyle,
        opacity: 0.85,
        margin: '0.15rem 0 0 0',
        textAlign: 'left',
      };
    }

    if (lineId === 'identity-1') {
      return {
        ...baseStyle,
        margin: '0.5rem 0 0.25rem 0',
        textAlign: 'left',
      };
    }

    return { ...baseStyle, margin: '0 0' };
  }, [getLineColor]);

  const cancelAllTimers = useCallback(() => {
    timeoutIdsRef.current.forEach(id => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  const runAnimation = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);

    cancelAllTimers();
    setVisibleLines([]);

    let totalDelay = 0;

    BOOT_LINES.forEach((line, index) => {
      const delay = index * 150;
      totalDelay = delay;

      const timeoutId = setTimeout(() => {
        setVisibleLines(prev => {
          const updated = [...prev, line];
          return updated.length > 5 ? updated.slice(-5) : updated;
        });
      }, delay);

      timeoutIdsRef.current.push(timeoutId);
    });

    const clearDelay = totalDelay + 800 + 250;
    const clearTimeoutId = setTimeout(() => {
      setVisibleLines([]);
    }, clearDelay);
    timeoutIdsRef.current.push(clearTimeoutId);

    const identityStartDelay = clearDelay + 300;
    
    IDENTITY_LINES.forEach((line, index) => {
      const delay = identityStartDelay + index * 200;

      const timeoutId = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, delay);

      timeoutIdsRef.current.push(timeoutId);
    });

    const completeDelay = identityStartDelay + IDENTITY_LINES.length * 200 + 500;
    const completeTimeoutId = setTimeout(() => {
      isRunningRef.current = false;
      setIsRunning(false);
    }, completeDelay);
    timeoutIdsRef.current.push(completeTimeoutId);
  }, [cancelAllTimers]);

  useEffect(() => {
    runAnimation();

    return () => {
      cancelAllTimers();
      isRunningRef.current = false;
      setIsRunning(false);
    };
  }, [runAnimation, cancelAllTimers]);

  const handleReplay = useCallback(() => {
    if (isRunningRef.current) return;
    cancelAllTimers();
    setVisibleLines([]);
    isRunningRef.current = false;
    setIsRunning(false);
    runAnimation();
  }, [runAnimation, cancelAllTimers]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-8">
      <style>{`
        @keyframes glowPulseScale {
          0% {
            text-shadow: 0 0 4px rgba(37, 99, 235, 0.2);
            transform: scale(0.98);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: scale(1.01);
            text-shadow: 0 0 6px rgba(37, 99, 235, 0.3);
          }
          50% {
            transform: scale(1.01);
            text-shadow: 0 0 8px rgba(37, 99, 235, 0.3);
          }
          85% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 6px rgba(37, 99, 235, 0.2);
          }
          100% {
            text-shadow: 0 0 4px rgba(37, 99, 235, 0.2);
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes blinkCursor {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
      `}</style>

      <div
        className="rounded-none overflow-hidden border-4 border-black relative group transition-all duration-300"
        style={{
          backgroundColor: '#FAFAFA',
          boxShadow: '6px 6px 0px #000000',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '8px 8px 0px #000000';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '6px 6px 0px #000000';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b-4 border-black relative z-20"
          style={{
            backgroundColor: '#FAFAFA',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>

          <button
            onClick={handleReplay}
            disabled={isRunning}
            className="flex items-center justify-center w-8 h-8 border-2 border-black transition-all duration-200 hover:scale-110 active:scale-95 relative z-30"
            style={{
              backgroundColor: isRunning ? '#E5E7EB' : '#2563EB',
              color: isRunning ? '#999999' : '#FFFFFF',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              boxShadow: isRunning ? 'none' : '2px 2px 0px #000000',
            }}
            onMouseEnter={e => {
              if (!isRunning) {
                e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
              }
            }}
            onMouseLeave={e => {
              if (!isRunning) {
                e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
              }
            }}
            title="Replay animation"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginLeft: '2px' }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <div
          className="overflow-hidden relative z-20"
          style={{
            height: '180px',
            backgroundColor: '#FAFAFA',
            padding: '1rem',
          }}
        >
          <div className="space-y-0">
            {visibleLines.map((line, index) => {
              const isIdentityStart = line.id === 'identity-1' && index > 0;
              const hasArrow = line.text.startsWith('>');
              const displayText = hasArrow ? line.text.substring(1).trim() : line.text;
              
              return (
                <div key={line.id}>
                  {isIdentityStart && (
                    <div
                      style={{
                        height: '2px',
                        backgroundColor: '#000000',
                        margin: '0.5rem 0',
                      }}
                    />
                  )}
                  
                  <div
                    style={{
                      ...getLineStyle(line.color, line.id),
                      position: 'relative',
                    }}
                  >
                    {hasArrow && line.id !== 'identity-2' && (
                      <span style={{ color: '#2563EB', fontWeight: '600', marginRight: '0.3rem' }}>
                        &gt;
                      </span>
                    )}
                    {line.id === 'identity-2' && (
                      <span
                        style={{
                          color: '#2563EB',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          marginRight: '0.8rem',
                        }}
                      >
                        &gt;
                      </span>
                    )}
                    {displayText}
                    {index === visibleLines.length - 1 && (
                      <span
                        style={{
                          color: '#2563EB',
                          fontWeight: '600',
                          animation: 'blinkCursor 1s ease-in-out infinite',
                          marginLeft: '2px',
                          display: 'inline-block',
                        }}
                      >
                        _
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
