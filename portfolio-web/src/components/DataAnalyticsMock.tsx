import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface DemoProps {
  isDark: boolean;
  accent: string;
}

// A miniature, self-playing replica of the Data Analysis Agent workspace: a
// question lands in the thread, the agent answers with a figure, the chart
// draws itself bar by bar, and the generated PPTX drops in underneath.

const BARS = [
  { year: '2014', value: 43 },
  { year: '2015', value: 61 },
  { year: '2016', value: 81 },
  { year: '2017', value: 93 },
];

const PHASE_MS = 1250;
const PHASE_COUNT = 10;

export default function DataAnalyticsMock({ isDark, accent }: DemoProps) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASE_COUNT), PHASE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Reduced motion gets the finished state, no loop.
  const p = reduce ? 6 : phase;
  const asked = p >= 1;
  const thinking = p === 2;
  const answered = p >= 3;
  const charted = p >= 4;
  const exported = p >= 5;

  const c = isDark
    ? {
        app: '#12141A', page: '#0E1015', card: '#1A1D24', line: 'rgba(255,255,255,0.13)',
        text: '#EDEAE3', muted: '#98A0AC', navy: '#E8EAEE', navyBg: '#2A2F3A',
        green: '#4FBF8B', greenBg: 'rgba(79,191,139,0.16)', bar: '#8B84FF', link: '#6FD2C4',
      }
    : {
        app: '#FFFFFF', page: '#F7F5F0', card: '#FFFFFF', line: 'rgba(0,0,0,0.10)',
        text: '#111827', muted: '#6B7280', navy: '#FFFFFF', navyBg: '#111827',
        green: '#2F7D5D', greenBg: '#DCEFE4', bar: '#6E63F5', link: '#0F766E',
      };

  return (
    <div className="w-full flex flex-col text-left" style={{ backgroundColor: c.page }}>
      {/* ── App header ── */}
      <div
        className="flex items-center gap-1.5 px-2 py-1.5 border-b"
        style={{ borderColor: c.line, backgroundColor: c.app }}
      >
        <span className="flex-1 min-w-0">
          <span className="block text-[0.58rem] font-bold leading-none" style={{ color: c.text }}>
            Data Analysis Agent
          </span>
          <span
            className="block text-[0.36rem] leading-none mt-0.5 uppercase tracking-[0.2em]"
            style={{ color: c.muted }}
          >
            Workspace Console
          </span>
        </span>
        <span
          className="flex items-center gap-0.5 rounded-full p-0.5 border"
          style={{ borderColor: c.line }}
        >
          <span
            className="px-1.5 py-0.5 rounded-full text-[0.4rem] font-bold"
            style={{ backgroundColor: c.navyBg, color: c.navy }}
          >
            Chat
          </span>
          <span className="px-1.5 py-0.5 text-[0.4rem] font-bold" style={{ color: c.muted }}>
            Data Ingestion
          </span>
        </span>
        <span
          className="hidden sm:flex items-center gap-1 rounded-full p-0.5 pl-1.5 border text-[0.38rem]"
          style={{ borderColor: c.line, color: c.muted }}
        >
          user1@example.com
          <span
            className="px-1.5 py-0.5 rounded-full text-[0.38rem] font-bold"
            style={{ backgroundColor: c.navyBg, color: c.navy }}
          >
            Logout
          </span>
        </span>
      </div>

      {/* ── Body ── */}
      <div className="grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] gap-1.5 p-1.5 items-stretch">
        {/* Sidebar */}
        <div className="rounded-md border p-1.5" style={{ backgroundColor: c.card, borderColor: c.line }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[0.46rem] font-bold" style={{ color: c.text }}>
              Data Sources
            </span>
            <span
              className="px-1 py-0.5 rounded-full text-[0.34rem] font-bold"
              style={{ backgroundColor: c.navyBg, color: c.navy }}
            >
              New
            </span>
          </div>

          {[
            { name: 'superstore-sales', on: true },
            { name: 'bestseller-books', on: false },
          ].map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between gap-1 rounded px-1 py-0.5 mb-0.5"
              style={{
                backgroundColor: s.on ? c.navyBg : 'transparent',
                border: s.on ? 'none' : `1px solid ${c.line}`,
              }}
            >
              <span
                className="text-[0.38rem] font-bold truncate"
                style={{ color: s.on ? c.navy : c.muted }}
              >
                {s.name}
              </span>
              <span
                className="px-1 rounded-full text-[0.3rem] font-bold flex-shrink-0"
                style={{ backgroundColor: c.greenBg, color: c.green }}
              >
                ready
              </span>
            </div>
          ))}

          <div className="my-1.5 border-t" style={{ borderColor: c.line }} />

          <span className="block text-[0.46rem] font-bold mb-1" style={{ color: c.text }}>
            Chat History
          </span>
          {['which was our most profitable year?', 'top 5 products by margin'].map((h, i) => (
            <div
              key={h}
              className="rounded px-1 py-0.5 mb-0.5"
              style={{ border: `1px solid ${c.line}`, opacity: i === 0 ? 1 : 0.6 }}
            >
              <span className="block text-[0.36rem] leading-tight truncate" style={{ color: c.text }}>
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Thread */}
        <div
          className="rounded-md border flex flex-col"
          style={{ backgroundColor: c.card, borderColor: c.line }}
        >
          <div
            className="flex items-center justify-between px-1.5 py-1 border-b"
            style={{ borderColor: c.line }}
          >
            <span className="min-w-0">
              <span className="block text-[0.44rem] font-bold leading-none" style={{ color: c.text }}>
                superstore-sales
              </span>
              <span className="block text-[0.32rem] font-mono mt-0.5" style={{ color: c.muted }}>
                Thread: 019e133d-0655
              </span>
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <span
                className="px-1 py-0.5 rounded-full text-[0.32rem] font-bold"
                style={{ backgroundColor: c.greenBg, color: c.green }}
              >
                FILE
              </span>
              <span
                className="px-1 py-0.5 rounded-full text-[0.32rem] font-bold"
                style={{ backgroundColor: c.navyBg, color: c.navy }}
              >
                New
              </span>
            </span>
          </div>

          {/* Conversation */}
          <div className="flex-1 min-h-[112px] px-1.5 py-1 flex flex-col gap-1 overflow-hidden">
            {!asked ? (
              <p className="text-[0.4rem] m-auto text-center" style={{ color: c.muted }}>
                Start by asking something like "Show me total sales by region".
              </p>
            ) : (
              <>
                {/* The question */}
                <motion.div
                  className="self-end max-w-[82%] rounded px-1.5 py-1"
                  style={{ backgroundColor: c.navyBg }}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                >
                  <p className="text-[0.4rem] leading-tight" style={{ color: c.navy }}>
                    which was our most profitable year? add a chart and a ppt for the sales team.
                  </p>
                </motion.div>

                {/* Working indicator */}
                <AnimatePresence>
                  {thinking && (
                    <motion.div
                      className="flex items-center gap-1"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="text-[0.36rem] font-mono" style={{ color: c.muted }}>
                        generating SQL
                      </span>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-[3px] h-[3px] rounded-full"
                          style={{ backgroundColor: accent }}
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The answer */}
                {answered && (
                  <motion.p
                    className="text-[0.4rem] leading-snug"
                    style={{ color: c.text }}
                    initial={reduce ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Most profitable year: <b>2017</b> — Total Profit ={' '}
                    <b style={{ color: c.green }}>93,439.27</b>
                  </motion.p>
                )}

                {/* The chart, drawn bar by bar */}
                {charted && (
                  <motion.div
                    className="rounded border px-1.5 pt-1 pb-0.5"
                    style={{ borderColor: c.line, backgroundColor: isDark ? '#0F1116' : '#FCFCFD' }}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p
                      className="text-[0.3rem] font-bold uppercase tracking-[0.15em] mb-1"
                      style={{ color: c.muted }}
                    >
                      Total profit by order year
                    </p>
                    {/* Plot area and axis labels are separate rows, so a bar's
                        height resolves against the plot alone. */}
                    <div className="flex items-end gap-1.5 h-[26px]">
                      {BARS.map((b, i) => (
                        <motion.div
                          key={b.year}
                          className="flex-1"
                          style={{ backgroundColor: c.bar }}
                          initial={reduce ? false : { height: 0 }}
                          animate={{ height: `${b.value}%` }}
                          transition={{
                            type: 'spring',
                            stiffness: 180,
                            damping: 18,
                            delay: reduce ? 0 : i * 0.12,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1.5 mt-0.5">
                      {BARS.map((b) => (
                        <span
                          key={b.year}
                          className="flex-1 text-center text-[0.28rem]"
                          style={{ color: c.muted }}
                        >
                          {b.year}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* The generated deck */}
                {exported && (
                  <motion.div
                    className="flex items-center gap-1"
                    initial={reduce ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  >
                    <span
                      className="px-1 py-0.5 rounded text-[0.3rem] font-bold"
                      style={{ backgroundColor: c.greenBg, color: c.green }}
                    >
                      PPTX
                    </span>
                    <span
                      className="text-[0.36rem] font-mono underline truncate"
                      style={{ color: c.link }}
                    >
                      superstore_most_profitable_year.pptx
                    </span>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Composer */}
          <div className="flex items-center gap-1 px-1.5 py-1 border-t" style={{ borderColor: c.line }}>
            <span
              className="flex-1 rounded-full px-1.5 py-0.5 text-[0.36rem]"
              style={{ border: `1px solid ${c.line}`, color: c.muted }}
            >
              Ask about your data…
            </span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[0.36rem] font-bold"
              style={{ backgroundColor: c.navyBg, color: c.navy }}
            >
              Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
