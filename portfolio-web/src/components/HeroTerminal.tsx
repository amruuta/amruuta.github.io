import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { portfolioData } from '../data/portfolioData';

interface TerminalLine {
  id: string;
  text: string;
  color: 'default' | 'success' | 'highlight' | 'subtitle' | 'ascii';
  /** Command output is indented; the echoed command itself stays flush-left,
      which gives the transcript a readable rhythm in a small window. */
  indent?: boolean;
}

// Unique ids for lines produced by commands, so React keys stay stable as
// output accumulates.
let lineSeq = 0;
const mk = (
  text: string,
  color: TerminalLine['color'] = 'default',
  indent = false
): TerminalLine => ({
  id: `out-${lineSeq++}`,
  text,
  color,
  indent,
});

// "AMRUTA BENDALE" as two rows of solid block characters. The stock B in this
// style is █▄▄/█▄█, whose full top-left stroke reads as a lowercase "b" — so
// its top row is ██▄ here, giving it a proper closed upper bowl. Box-drawing
// glyphs were tried instead and were worse: they don't connect vertically in a
// monospace face, so every letter came out as broken outlines.
const NAME_BANNER = [
  '▄▀█ █▀▄▀█ █▀█ █░█ ▀█▀ ▄▀█  ██▄ █▀▀ █▄░█ █▀▄ ▄▀█ █░░ █▀▀',
  '█▀█ █░▀░█ █▀▄ █▄█ ░█░ █▀█  █▄█ ██▄ █░▀█ █▄▀ █▀█ █▄▄ ██▄',
];

const SECTIONS = ['about', 'skills', 'experience', 'education', 'achievements', 'projects', 'contact'];

function scrollToSection(id: string) {
  // Matches how the navbar's anchors behave — Lenis is driving page scroll, so
  // a smooth scrollIntoView rides the same smoothing rather than fighting it.
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  // Same banner the `whoami` command prints, so the two agree.
  ...NAME_BANNER.map((row, i) => ({
    id: `identity-banner-${i}`,
    text: row,
    color: 'ascii' as const,
  })),
  { id: 'identity-3', text: '> Full Stack AI Engineer', color: 'subtitle' },
];

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Live prompt state — the terminal becomes typeable once the boot sequence
  // has finished playing.
  const [booted, setBooted] = useState(false);
  // Index of the current command's echo. Everything before it is prior
  // transcript and gets dimmed, so the latest response dominates (#2).
  const [liveFrom, setLiveFrom] = useState(0);
  const [lastCmd, setLastCmd] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const isRunningRef = useRef(false);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getLineColor = useCallback((color: TerminalLine['color']): string => {
    switch (color) {
      case 'success':
        return isDark ? '#22C55E' : '#16a34a';
      case 'highlight':
      case 'ascii':
        return isDark ? '#22d3ee' : '#2563EB';
      case 'subtitle':
        // Was #6B7280 on #FAFAFA — too washed out for body output.
        return isDark ? '#FBBF24' : '#4B5563';
      default:
        return isDark ? '#6EE7A8' : '#1F2937';
    }
  }, [isDark]);

  const getLineStyle = useCallback((color: TerminalLine['color'], lineId: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontFamily: 'Fira Code, Courier New, monospace',
      color: getLineColor(color),
      fontSize: '0.8rem',
      lineHeight: '1.5',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    };

    if (color === 'highlight') {
      return {
        ...baseStyle,
        fontSize: '1.4rem',
        fontWeight: '700',
        letterSpacing: '0.12em',
        animation: isDark ? 'glowPulseScaleDark 2.5s ease-in-out' : 'glowPulseScaleLight 2.5s ease-in-out',
        margin: '0.3rem 0',
        position: 'relative',
        textAlign: 'left',
        color: isDark ? '#22d3ee' : '#2563EB',
        textShadow: isDark
          ? '0 0 16px rgba(34,211,238,0.6)'
          : '0 0 12px rgba(37,99,235,0.35)',
        paddingBottom: '0.5rem',
        paddingLeft: '0',
      };
    }

    // Block-character banner. Never wraps — the glyphs only line up as a
    // grid — so it scales with the viewport instead, keeping the full name on
    // two rows down to phone widths rather than breaking mid-letter.
    if (color === 'ascii') {
      return {
        ...baseStyle,
        whiteSpace: 'pre',
        fontSize: 'clamp(0.36rem, 1.5vw, 0.68rem)',
        lineHeight: '1',
        letterSpacing: '0',
        fontWeight: 700,
        margin: 0,
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
    
    // The banner's rows are one unit — staggering them would draw the name in
    // horizontal slices, which reads as a glitch rather than a reveal. So the
    // beat advances per *step*, and all banner rows share a step.
    const stepOf = (line: TerminalLine) =>
      line.id === 'identity-1' ? 0 : line.id.startsWith('identity-banner') ? 1 : 2;
    const STEPS = 3;

    IDENTITY_LINES.forEach((line) => {
      const delay = identityStartDelay + stepOf(line) * 260;

      const timeoutId = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, delay);

      timeoutIdsRef.current.push(timeoutId);
    });

    const completeDelay = identityStartDelay + STEPS * 260 + 500;
    const completeTimeoutId = setTimeout(() => {
      isRunningRef.current = false;
      setIsRunning(false);
      // Hand the terminal over to the visitor. The hint matters — without it
      // nobody discovers the prompt is live.
      setVisibleLines((prev) => [...prev, mk("type 'help' to explore", 'subtitle')]);
      setBooted(true);
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
    setBooted(false);
    isRunningRef.current = false;
    setIsRunning(false);
    runAnimation();
  }, [runAnimation, cancelAllTimers]);

  // ── Typewriter output (#4) ──────────────────────────────────────────────
  // Command responses are typed in rather than swapped in whole, so the
  // terminal reads as answering. The ASCII banner is exempt — revealing a
  // block-glyph grid column by column looks like corruption, not typing.
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTyping = useCallback(() => {
    if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
    typeTimerRef.current = null;
  }, []);

  const print = useCallback(
    (lines: TerminalLine[]) => {
      stopTyping();
      const queue = lines.map((l) => ({ ...l, indent: true }));
      let li = 0;
      let ci = 0;

      const step = () => {
        if (li >= queue.length) return;
        const line = queue[li];

        // Whole-line reveal for the banner.
        if (line.color === 'ascii') {
          setVisibleLines((prev) => [...prev, line]);
          li += 1;
          ci = 0;
          typeTimerRef.current = setTimeout(step, 40);
          return;
        }

        if (ci === 0) {
          setVisibleLines((prev) => [...prev, { ...line, text: '' }]);
        }
        ci += 1;
        const slice = line.text.slice(0, ci);
        setVisibleLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = { ...line, text: slice };
          return next;
        });

        if (ci >= line.text.length) {
          li += 1;
          ci = 0;
          typeTimerRef.current = setTimeout(step, 55); // beat between lines
        } else {
          typeTimerRef.current = setTimeout(step, 8); // ~8ms per character
        }
      };

      step();
    },
    [stopTyping]
  );

  useEffect(() => stopTyping, [stopTyping]);

  // ── Commands ────────────────────────────────────────────────────────────
  const { personal, skills, experience, projects, education } = portfolioData as any;

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      stopTyping();
      // Everything already on screen becomes past transcript.
      setVisibleLines((prev) => {
        setLiveFrom(prev.length);
        return [...prev, mk(`$ ${trimmed}`, 'success')];
      });
      if (!trimmed) return;
      setLastCmd(trimmed);

      const [cmd, ...rest] = trimmed.toLowerCase().split(/\s+/);
      const arg = rest.join(' ');

      switch (cmd) {
        // Grouped onto a few lines rather than one-per-command — the body only
        // shows ~6 lines at 155px, so a 12-line list scrolled instantly.
        case 'help':
          print([
            mk('whoami · skills · projects · experience'),
            mk('contact · github · education'),
            mk('goto <section> · theme · clear'),
          ]);
          break;

        case 'whoami':
          print([
            ...NAME_BANNER.map((row) => mk(row, 'ascii')),
            mk(personal.title, 'subtitle'),
            mk(`${personal.location} · ${personal.email}`),
          ]);
          break;

        case 'skills': {
          const keys = Object.keys(skills);
          if (arg && skills[arg]) {
            print([mk(`${arg}`, 'highlight'), mk(skills[arg].join(', '))]);
          } else {
            // Top few per area, not the whole inventory.
            print([
              mk(`languages   ${skills.languages?.slice(0, 4).join(', ')}`),
              mk(`ai          ${skills.agenticAI?.slice(0, 4).join(', ')}`),
              mk(`backend     ${skills.backendFrameworks?.slice(0, 4).join(', ')}`),
              mk(`try: skills <${keys.slice(0, 2).join('|')}>`, 'subtitle'),
            ]);
          }
          break;
        }

        // Print-only, same as `contact` — `goto projects` is there for jumping.
        case 'projects':
          print([
            ...projects.map((p: any) => mk(`  ${p.shortName ?? p.name}`)),
            mk('goto projects — to view them', 'subtitle'),
          ]);
          break;

        case 'experience':
          print(
            experience.map((e: any) => mk(`${e.duration.padEnd(22)} ${e.position} @ ${e.company}`))
          );
          break;

        case 'education':
          print(
            (Array.isArray(education) ? education : [education]).map((e: any) =>
              mk(`${e.degree ?? ''} — ${e.institution ?? ''} ${e.duration ?? ''}`.trim())
            )
          );
          break;

        case 'contact':
          print([
            mk(`email     ${personal.email}`),
            mk(`linkedin  ${personal.linkedin}`),
            mk(`github    ${personal.github}`),
          ]);
          break;

        case 'github':
          window.open(personal.github, '_blank', 'noopener,noreferrer');
          print([mk('opening github…', 'subtitle')]);
          break;

        case 'theme':
          toggleTheme();
          print([mk('theme toggled', 'subtitle')]);
          break;

        case 'goto':
          if (SECTIONS.includes(arg)) {
            scrollToSection(arg);
            print([mk(`→ ${arg}`, 'subtitle')]);
          } else {
            print([mk(`unknown section. try: ${SECTIONS.join(', ')}`, 'subtitle')]);
          }
          break;

        case 'clear':
          setVisibleLines([]);
          setLiveFrom(0);
          setLastCmd('');
          break;

        case 'sudo':
          print([mk('nice try 🙂', 'subtitle')]);
          break;

        default:
          // Bare section names work too — "projects", "contact" etc.
          if (SECTIONS.includes(cmd)) {
            scrollToSection(cmd);
            print([mk(`→ ${cmd}`, 'subtitle')]);
          } else {
            print([mk(`command not found: ${cmd} — type 'help'`, 'subtitle')]);
          }
      }
    },
    [print, stopTyping, personal, skills, experience, projects, education, toggleTheme]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const value = input;
      setInput('');
      if (value.trim()) {
        setHistory((h) => [value, ...h].slice(0, 30));
        setHistoryIdx(-1);
      }
      runCommand(value);
    },
    [input, runCommand]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Shell-style history recall.
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(historyIdx + 1, history.length - 1);
        if (next >= 0) {
          setHistoryIdx(next);
          setInput(history[next]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInput(next >= 0 ? history[next] : '');
      }
    },
    [history, historyIdx]
  );

  // Keep the newest output in view as it accumulates.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleLines, booted]);

  return (
    <div className="w-full max-w-xl mx-auto mt-2 mb-2">
      <style>{`
        @keyframes glowPulseScaleLight {
          0% {
            text-shadow: 0 0 4px rgba(37,99,235,0.2);
            transform: scale(0.98);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: scale(1.02);
            text-shadow: 0 0 20px rgba(37,99,235,0.6), 0 0 40px rgba(37,99,235,0.2);
          }
          50% {
            transform: scale(1.02);
            text-shadow: 0 0 28px rgba(37,99,235,0.7), 0 0 50px rgba(37,99,235,0.25);
          }
          85% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 12px rgba(37,99,235,0.4);
          }
          100% {
            text-shadow: 0 0 6px rgba(37,99,235,0.2);
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes glowPulseScaleDark {
          0% {
            text-shadow: 0 0 4px rgba(34,211,238,0.2);
            transform: scale(0.98);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: scale(1.02);
            text-shadow: 0 0 20px rgba(34,211,238,0.9), 0 0 40px rgba(34,211,238,0.4);
          }
          50% {
            transform: scale(1.02);
            text-shadow: 0 0 30px rgba(34,211,238,1), 0 0 60px rgba(34,211,238,0.5);
          }
          85% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 16px rgba(34,211,238,0.7);
          }
          100% {
            text-shadow: 0 0 8px rgba(34,211,238,0.5);
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes blinkCursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        /* Keep the scrollbar unobtrusive so command output doesn't introduce
           a heavy default bar inside the terminal chrome. */
        .hero-terminal-body { scrollbar-width: thin; scrollbar-color: rgba(37,99,235,0.35) transparent; }
        .hero-terminal-body::-webkit-scrollbar { width: 6px; }
        .hero-terminal-body::-webkit-scrollbar-track { background: transparent; }
        .hero-terminal-body::-webkit-scrollbar-thumb {
          background: rgba(37,99,235,0.35);
          border-radius: 3px;
        }
        .hero-terminal-body input::placeholder { opacity: 0.35; }
      `}</style>

      <div
        className="rounded-none overflow-hidden border-4 border-black relative group transition-all duration-300"
        style={{
          backgroundColor: isDark ? '#0D1117' : '#FAFAFA',
          boxShadow: isDark ? '6px 6px 0px #ffffff' : '6px 6px 0px #000000',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isDark ? '8px 8px 0px #ffffff' : '8px 8px 0px #000000';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isDark ? '6px 6px 0px #ffffff' : '6px 6px 0px #000000';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b-4 border-black relative z-20"
          style={{
            backgroundColor: isDark ? '#161b22' : '#F3F4F6',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>

          {/* flex-1 + min-w-0 lets this shrink instead of forcing the bar wider;
              nowrap + ellipsis stops it wrapping to a second line and colliding
              with the dots/replay button, which is what happened on a 390px
              phone with the longer hint text. The hint itself is also dropped
              below sm rather than truncated — "history" clipping to "hist…"
              reads worse than just not showing it when there's no room. */}
          <div className="flex-1 min-w-0 flex items-baseline justify-center gap-1 px-1.5 overflow-hidden">
            <span
              style={{
                fontFamily: 'Fira Code, Courier New, monospace',
                fontSize: '0.68rem',
                color: isDark ? '#4ade80' : '#6B7280',
                opacity: isDark ? 0.75 : 0.8,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}
            >
              {lastCmd ? `amruta@portfolio ~ $ ${lastCmd}` : 'amruta@portfolio ~ $'}
            </span>
            {!lastCmd && booted && (
              <span
                className="hidden sm:inline"
                style={{
                  fontFamily: 'Fira Code, Courier New, monospace',
                  fontSize: '0.68rem',
                  color: isDark ? '#4ade80' : '#6B7280',
                  opacity: isDark ? 0.55 : 0.6,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
                type 'help' · ↑ history
              </span>
            )}
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
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="relative z-20 hero-terminal-body"
          style={{
            height: '155px',
            overflowY: 'auto',
            cursor: booted ? 'text' : 'default',
            backgroundColor: isDark ? '#0D1117' : '#FAFAFA',
            padding: '0.8rem',
            // The CRT scanline stripes ran directly behind the text. Fine for
            // 3 lines of decorative boot output, actively unreadable once real
            // command output sits on top of them — so they're gone.
          }}
        >
          <div className="relative z-10 space-y-0">
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
                        backgroundColor: '#2563EB',
                        opacity: isDark ? 0.55 : 0.6,
                        margin: '0.5rem 0',
                      }}
                    />
                  )}

                  <div
                    style={{
                      ...getLineStyle(line.color, line.id),
                      position: 'relative',
                      // #3 — output sits in from the flush-left command echo.
                      paddingLeft: line.indent ? '0.85rem' : 0,
                      // #2 — anything before the current command is prior
                      // transcript; fading it makes the latest answer read
                      // first in a window this small.
                      opacity: index < liveFrom ? 0.5 : 1,
                      transition: 'opacity 260ms ease-out',
                    }}
                  >
                    {hasArrow && (
                      <span style={{ color: isDark ? '#22C55E' : '#2563EB', fontWeight: '600', marginRight: '0.3rem' }}>
                        &gt;
                      </span>
                    )}
                    {displayText}
                    {/* Once the prompt is live it carries the cursor instead. */}
                    {!booted && index === visibleLines.length - 1 && (
                      <span
                        style={{
                          color: isDark ? '#22C55E' : '#2563EB',
                          fontWeight: '700',
                          animation: 'blinkCursor 1s ease-in-out infinite',
                          marginLeft: '2px',
                          display: 'inline-block',
                          textShadow: isDark ? '0 0 8px rgba(34,197,94,0.8)' : '0 0 6px rgba(37,99,235,0.6)',
                        }}
                      >
                        _
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live prompt */}
            {booted && (
              <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="hero-terminal-input" className="sr-only">
                  Terminal command input
                </label>
                <span
                  aria-hidden="true"
                  style={{
                    color: isDark ? '#22C55E' : '#2563EB',
                    fontWeight: 600,
                    marginRight: '0.3rem',
                    fontFamily: 'Fira Code, Courier New, monospace',
                    fontSize: '0.8rem',
                  }}
                >
                  $
                </span>
                <input
                  id="hero-terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="help"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: 0,
                    fontFamily: 'Fira Code, Courier New, monospace',
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    color: getLineColor('default'),
                    caretColor: isDark ? '#22C55E' : '#2563EB',
                  }}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
