import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface PresenterAssistantMockProps {
  isDark: boolean;
  accent: string;
}

// A miniature, self-playing replica of the Presenter Assistant UI: the document
// uploads and turns green, the audio session starts listening, the transcript
// fills line by line, and suggested answers land one at a time beside it.
// Drop real PNGs into src/assets/ai-meeting-assistant/ and this disappears.

const TRANSCRIPT = [
  { who: 'Dev', text: 'Where is customer data stored?' },
  { who: 'Presenter', text: 'Security is covered in its own section.' },
  { who: 'Marcus', text: 'Is there a mobile app available yet?' },
  { who: 'Presenter', text: 'Let me check the roadmap on that.' },
  { who: 'Dev', text: 'What is the meaning of life?' },
];

const ANSWERS = [
  {
    q: 'Where is customer data stored?',
    who: 'Dev',
    grounded: true,
    body: 'Encrypted at rest, and never shared with third parties.',
    chip: 'Security',
    score: '0.71',
  },
  {
    q: 'Is there a mobile app available yet?',
    who: 'Marcus',
    grounded: true,
    body: 'Not yet — the roadmap plans one for later this year, with no date committed.',
    chip: 'Roadmap',
    score: '0.57',
  },
  {
    q: 'What is the meaning of life?',
    who: 'Dev',
    grounded: false,
    body: 'Please clarify which part of the document to reference.',
    chip: 'No matching section found',
  },
];

const PHASE_MS = 1250;
const PHASE_COUNT = 12; // last couple of phases hold the finished state

export default function PresenterAssistantMock({ isDark, accent }: PresenterAssistantMockProps) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASE_COUNT), PHASE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Reduced motion gets the finished state, no loop.
  const p = reduce ? PHASE_COUNT - 3 : phase;
  const docReady = p >= 1;
  const listening = p >= 2;
  const transcriptCount = p <= 2 ? 0 : Math.min(p - 2, TRANSCRIPT.length);
  const answerCount = Math.max(0, Math.min(Math.floor((p - 2) / 2), ANSWERS.length));

  const c = isDark
    ? {
        app: '#12141A', card: '#1A1D24', line: 'rgba(255,255,255,0.13)', text: '#EDEAE3',
        muted: '#98A0AC', green: '#4FBF8B', greenBg: 'rgba(79,191,139,0.16)',
        amber: '#E0A458', amberBg: 'rgba(224,164,88,0.14)', red: '#D9635A',
        badge: '#8FA8D8', idle: 'rgba(255,255,255,0.09)', disabled: 'rgba(255,255,255,0.08)',
      }
    : {
        app: '#F7F4EC', card: '#FFFFFF', line: 'rgba(0,0,0,0.10)', text: '#1C1B18',
        muted: '#6B675F', green: '#2F7D5D', greenBg: '#DCEFE4',
        amber: '#B45309', amberBg: '#FBEEDA', red: '#B4443A',
        badge: '#2C3E63', idle: 'rgba(0,0,0,0.05)', disabled: 'rgba(0,0,0,0.07)',
      };

  const bars = Array.from({ length: 22 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75);

  const StepBadge = ({ n, done }: { n: number; done: boolean }) => (
    <motion.span
      className="flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[0.42rem] font-bold"
      animate={{ backgroundColor: done ? c.green : c.badge }}
      style={{ color: '#FFFFFF' }}
    >
      {done ? '✓' : n}
    </motion.span>
  );

  return (
    <div className="w-full flex flex-col text-left" style={{ backgroundColor: c.app }}>
      {/* ── App header ── */}
      <div
        className="flex items-center gap-1.5 px-2 py-1.5 border-b"
        style={{ borderColor: c.line, backgroundColor: c.card }}
      >
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center text-[0.5rem]"
          style={{ backgroundColor: c.badge, color: '#FFFFFF' }}
        >
          ✦
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[0.58rem] font-bold leading-none" style={{ color: c.text }}>
            Presenter Assistant
          </span>
          <span className="block text-[0.42rem] leading-none mt-0.5" style={{ color: c.muted }}>
            Live answers from your document
          </span>
        </span>
        <motion.span
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[0.44rem] font-bold border"
          animate={{
            borderColor: listening ? c.green : c.line,
            color: listening ? c.green : c.muted,
          }}
        >
          <motion.span
            className="w-1 h-1 rounded-full"
            animate={{ backgroundColor: listening ? c.green : c.muted, opacity: listening ? [1, 0.3, 1] : 1 }}
            transition={{ duration: 1.4, repeat: listening ? Infinity : 0 }}
          />
          {listening ? 'Listening' : 'Idle'}
        </motion.span>
      </div>

      {/* ── Body ── */}
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] gap-1.5 p-1.5 items-start">
        {/* Left: session setup */}
        <div className="rounded-md border p-1.5" style={{ backgroundColor: c.card, borderColor: c.line }}>
          <p className="flex items-center gap-1 text-[0.4rem] mb-1.5" style={{ color: c.muted }}>
            <span>🔒</span> Private to you — don't screen-share
          </p>

          {/* Step 1 — document */}
          <div className="flex items-center gap-1 mb-1">
            <StepBadge n={1} done={docReady} />
            <span className="text-[0.48rem] font-bold" style={{ color: c.text }}>
              Presentation document
            </span>
          </div>

          <AnimatePresence mode="wait">
            {docReady ? (
              <motion.div
                key="file"
                className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
                style={{ backgroundColor: c.greenBg, border: `1px dashed ${c.green}` }}
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: -3 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex items-center justify-center text-[0.36rem]"
                  style={{ backgroundColor: c.green, color: '#FFF' }}
                >
                  ✓
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.44rem] font-bold truncate" style={{ color: c.text }}>
                    sample_presentation.docx
                  </span>
                  <span className="block text-[0.38rem]" style={{ color: c.muted }}>
                    6 sections · 6 chunks indexed
                  </span>
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                className="rounded-md px-1.5 py-1.5 text-center"
                style={{ border: `1px dashed ${c.line}` }}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="block text-[0.44rem] font-bold" style={{ color: c.text }}>
                  Choose a .docx file
                </span>
                <span className="block text-[0.38rem]" style={{ color: c.muted }}>
                  Click to browse
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="my-1.5 border-t" style={{ borderColor: c.line }} />

          {/* Step 2 — audio */}
          <div className="flex items-center gap-1 mb-1">
            <StepBadge n={2} done={listening} />
            <span className="text-[0.48rem] font-bold" style={{ color: c.text }}>
              Meeting audio
            </span>
          </div>

          <div
            className="flex items-center justify-between rounded px-1.5 py-0.5 mb-1 text-[0.4rem]"
            style={{ border: `1px solid ${c.line}`, color: c.muted }}
          >
            Scripted transcript (demo) <span>▾</span>
          </div>

          <motion.div
            className="rounded px-1.5 py-1 text-center text-[0.44rem] font-bold"
            animate={{
              backgroundColor: listening ? c.red : docReady ? c.badge : c.disabled,
              color: listening || docReady ? '#FFFFFF' : c.muted,
            }}
            transition={{ duration: 0.35 }}
          >
            {listening ? '■ Stop listening' : '▶ Start listening'}
          </motion.div>

          {/* Status + the waveform */}
          <div className="h-4 mt-1 flex items-center gap-1">
            <AnimatePresence mode="wait">
              {listening ? (
                <motion.div
                  key="wave"
                  className="flex items-center gap-1 w-full"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: c.green }}
                    animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <div className="flex items-center gap-[2px] h-3 flex-1 overflow-hidden">
                    {bars.map((h, i) => (
                      <motion.span
                        key={i}
                        className="flex-1 min-w-[1.5px] origin-center"
                        style={{ backgroundColor: accent, height: `${h * 100}%` }}
                        animate={reduce ? undefined : { scaleY: [h, 0.3 + (1 - h) * 0.9, h] }}
                        transition={{
                          duration: 1.1 + (i % 5) * 0.14,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.04,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.span
                  key="hint"
                  className="text-[0.38rem]"
                  style={{ color: c.muted }}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {docReady ? 'Ready to start the session.' : 'Upload a document first.'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="my-1.5 border-t" style={{ borderColor: c.line }} />

          {/* Live transcript */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[0.48rem] font-bold" style={{ color: c.text }}>
              Live transcript
            </span>
            <motion.span
              key={transcriptCount}
              className="px-1 rounded-full text-[0.38rem] font-bold border"
              style={{ borderColor: c.line, color: c.muted }}
              initial={reduce ? false : { scale: 1.35 }}
              animate={{ scale: 1 }}
            >
              {transcriptCount}
            </motion.span>
          </div>

          <div
            className="rounded px-1.5 py-1 h-[46px] overflow-hidden flex flex-col justify-end gap-0.5"
            style={{ backgroundColor: c.app }}
          >
            {transcriptCount === 0 ? (
              <span className="text-[0.38rem]" style={{ color: c.muted }}>
                Nothing transcribed yet.
              </span>
            ) : (
              TRANSCRIPT.slice(Math.max(0, transcriptCount - 3), transcriptCount).map((t) => (
                <motion.p
                  key={t.text}
                  className="text-[0.4rem] leading-tight"
                  style={{ color: c.text }}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-bold" style={{ color: c.muted }}>
                    {t.who}{' '}
                  </span>
                  {t.text}
                </motion.p>
              ))
            )}
          </div>
        </div>

        {/* Right: suggested answers */}
        <div>
          <div className="flex items-center gap-1 mb-1 px-0.5">
            <span className="text-[0.55rem] font-bold" style={{ color: c.text }}>
              Suggested answers
            </span>
            {answerCount > 0 && (
              <motion.span
                key={answerCount}
                className="px-1 rounded-full text-[0.38rem] font-bold border"
                style={{ borderColor: c.line, color: c.muted }}
                initial={reduce ? false : { scale: 1.4 }}
                animate={{ scale: 1 }}
              >
                {answerCount}
              </motion.span>
            )}
          </div>

          <div className="flex flex-col gap-1 h-[152px] overflow-hidden">
            {answerCount === 0 ? (
              <div
                className="rounded-md border flex flex-col items-center justify-center h-full text-center px-2"
                style={{ backgroundColor: c.card, borderColor: c.line }}
              >
                <span className="text-[0.5rem] font-bold" style={{ color: c.text }}>
                  No questions yet
                </span>
                <span className="text-[0.4rem] mt-0.5" style={{ color: c.muted }}>
                  Start listening to see suggested answers here.
                </span>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {ANSWERS.slice(0, answerCount)
                  .slice()
                  .reverse()
                  .map((a) => (
                    <motion.div
                      key={a.q}
                      layout={!reduce}
                      className="rounded-md border p-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: c.card,
                        borderColor: c.line,
                        borderLeft: `2.5px solid ${a.grounded ? c.green : c.amber}`,
                      }}
                      initial={reduce ? false : { opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      <p
                        className="text-[0.36rem] font-bold uppercase tracking-wider"
                        style={{ color: c.muted }}
                      >
                        Question
                      </p>
                      <p className="text-[0.46rem] font-bold leading-tight" style={{ color: c.text }}>
                        {a.q}
                      </p>
                      <p className="text-[0.36rem] mt-0.5" style={{ color: c.muted }}>
                        {a.who} · now
                      </p>
                      <div className="my-1 border-t" style={{ borderColor: c.line }} />
                      <p
                        className="text-[0.36rem] font-bold uppercase tracking-wider"
                        style={{ color: a.grounded ? c.green : c.amber }}
                      >
                        {a.grounded ? 'Suggested answer' : 'Not in document'}
                      </p>
                      <p className="text-[0.42rem] leading-snug mt-0.5" style={{ color: c.text }}>
                        {a.body}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 mt-1 px-1 py-0.5 rounded text-[0.36rem] font-bold"
                        style={{
                          backgroundColor: a.grounded ? c.idle : c.amberBg,
                          color: a.grounded ? c.muted : c.amber,
                        }}
                      >
                        {a.grounded ? `📖 ${a.chip}` : `⚠ ${a.chip}`}
                        {a.score && (
                          <span
                            className="px-1 rounded-full border"
                            style={{ borderColor: c.line, color: c.muted }}
                          >
                            {a.score}
                          </span>
                        )}
                      </span>
                    </motion.div>
                  ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
