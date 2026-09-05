import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';
import PresenterAssistantMock from './PresenterAssistantMock';
import DataAnalyticsMock from './DataAnalyticsMock';

// Each project's folder holds a live, self-playing replica of that app's UI.
// `demo` in portfolioData picks which one.
const DEMOS: Record<
  string,
  (p: { isDark: boolean; accent: string; onCycleComplete?: () => void }) => JSX.Element
> = {
  'data-analytics': DataAnalyticsMock,
  'presenter-assistant': PresenterAssistantMock,
};

// ─── Folder palette ─────────────────────────────────────────────────────────
// Each project gets its own folder colour and the whole folder re-tints on
// switch. The folder card itself stays light in both themes (it's a physical
// object); `accent` is the colour used on the paper inside, so it flips bright
// for dark mode.
interface Folder {
  body: string;
  tab: string;
  note: string;
  accent: string;
}
const FOLDERS_LIGHT: Folder[] = [
  { body: '#FFD35C', tab: '#F7C137', note: '#FFFBEA', accent: '#8A5A02' }, // amber
  { body: '#7FE3D4', tab: '#57D2C0', note: '#F4FCF7', accent: '#0A6157' }, // teal
  { body: '#FBB6D2', tab: '#F49BC2', note: '#FFF6FA', accent: '#8C1247' }, // pink
];
const FOLDERS_DARK: Folder[] = [
  { body: '#E4B645', tab: '#C9971E', note: '#2B2416', accent: '#F5C954' },
  { body: '#63C9BA', tab: '#3FAA9C', note: '#152A29', accent: '#5FD8C7' },
  { body: '#E09DBB', tab: '#C87C9D', note: '#2B1A22', accent: '#F49CC4' },
];

const STICKER_COLORS = ['#FFFFFF', '#FDE68A', '#BBF7D0', '#BFDBFE', '#FBCFE8', '#DDD6FE', '#FED7AA'];

const LINE = '#000000';
const FOLDER_INK = '#141210'; // text sitting on a folder card — always dark

// A real folder tab: straight left edge, flat top, and the right edge sloping
// down into the folder body. Drawn as a black shape with the colour inset on
// top of it, so the border stays crisp along the slope.
const TAB_CLIP = 'polygon(0% 0%, calc(100% - 18px) 0%, 100% 100%, 0% 100%)';
const TAB_RADIUS = 9;

// ─── Component ──────────────────────────────────────────────────────────────
export default function Projects() {
  const { projects } = portfolioData;
  const { isDark } = useTheme();
  const reduce = useReducedMotion();

  const folders = isDark ? FOLDERS_DARK : FOLDERS_LIGHT;
  // Paper surfaces go dark in dark mode instead of glaring white.
  const T = isDark
    ? { paper: '#171A20', page2: '#22262E', mount: '#0E1015', ink: '#F2EFE9', soft: '#A9B1BD', onAccent: '#141210' }
    : { paper: '#FFFDF8', page2: '#F1ECE0', mount: '#FFFFFF', ink: '#141210', soft: '#4A4136', onAccent: '#FFFFFF' };

  // null = every folder closed (only reachable in the mobile accordion).
  const [selected, setSelected] = useState<number | null>(0);
  // Bumping this remounts whichever demo is currently on screen, restarting
  // its animation from the top — the demos already loop on their own, this
  // just gives an explicit "play it again" control.
  const [replayTick, setReplayTick] = useState(0);

  const incomingIdx = projects.length;
  const desktopIdx = selected ?? 0;

  const sectionRef = useRef<HTMLElement>(null);
  // Demos only run once the section is actually on screen, so the animation is
  // at frame one when you arrive instead of caught mid-loop.
  const sectionInView = useInView(sectionRef, { margin: '0px 0px -20% 0px' });

  const tabCount = projects.length + 1;

  // Each demo plays one full pass, then hands over to the next tab. Driving it
  // off the animation (rather than scroll position) means you always start on
  // Data Analytics and always see a complete run before it moves on — scroll
  // mapping skipped past whole tabs because the section is only ~900px tall.
  const advance = useCallback(() => {
    setSelected((cur) => ((cur ?? 0) + 1) % tabCount);
  }, [tabCount]);

  // The "Projects incoming" card has no demo to finish, so give it a fixed
  // beat before wrapping back round to the start.
  useEffect(() => {
    if (reduce || !sectionInView) return;
    if (desktopIdx !== incomingIdx) return;
    const id = setTimeout(advance, 5000);
    return () => clearTimeout(id);
  }, [reduce, sectionInView, desktopIdx, incomingIdx, advance]);

  const labelOf = (idx: number) =>
    idx === incomingIdx ? 'Projects incoming' : projects[idx].shortName ?? projects[idx].name;

  // ─── The paper sheet inside a folder ──────────────────────────────────────
  const renderSheet = (idx: number, stacked: boolean) => {
    const folder = folders[idx % folders.length];

    if (idx === incomingIdx) {
      return (
        <div className="flex flex-col items-center text-center gap-4 py-10 px-5">
          <motion.span
            className="text-5xl font-black leading-none"
            style={{ color: folder.accent }}
            animate={reduce ? undefined : { rotate: [0, 90, 90, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            +
          </motion.span>
          <motion.div
            className="relative px-5 py-4 border-2 max-w-xs"
            style={{
              backgroundColor: folder.note,
              borderColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.18)',
              rotate: -1.5,
              boxShadow: '5px 5px 0 rgba(0,0,0,0.28)',
            }}
            whileHover={{ rotate: 0 }}
          >
            <p className="font-mono text-sm" style={{ color: T.ink }}>
              building_next_thing
              {!reduce && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
                >
                  _
                </motion.span>
              )}
            </p>
            <p className="text-[0.82rem] leading-relaxed mt-2" style={{ color: T.soft }}>
              There's always something half-built on my machine. Got a problem worth solving?
            </p>
          </motion.div>
          <a
            href="#contact"
            className="text-xs font-bold uppercase tracking-wider px-4 py-2.5 border-4 no-underline transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: LINE,
              backgroundColor: folder.accent,
              color: T.onAccent,
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            Let's talk →
          </a>
        </div>
      );
    }

    const project = projects[idx];
    const Demo = project.demo ? DEMOS[project.demo] : undefined;
    const repoName = project.github?.split('/').pop() ?? '';

    return (
      <div className={`grid gap-5 p-4 sm:p-5 ${stacked ? '' : 'lg:grid-cols-[1.5fr_1fr]'}`}>
        {/* ── The taped screen ── */}
        <div className="flex flex-col justify-center gap-3">
          {/* Repo name + replay control, top row above the demo — kept above
              the washi tape entirely so neither ever sits over the screen. */}
          <div className="flex items-center justify-between gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 border-[3px] no-underline font-mono font-bold text-[0.72rem] tracking-tight transition-transform hover:-translate-y-0.5"
              style={{
                borderColor: LINE,
                backgroundColor: folder.accent,
                color: T.onAccent,
                boxShadow: '3px 3px 0 rgba(0,0,0,0.9)',
              }}
            >
              <FolderGlyph color={T.onAccent} />
              /{repoName}
            </a>

            {Demo && (
              <motion.button
                type="button"
                onClick={() => setReplayTick((t) => t + 1)}
                aria-label="Replay demo animation"
                title="Replay animation"
                className="flex-shrink-0 flex items-center justify-center w-7 h-7 border-[3px]"
                style={{
                  borderColor: LINE,
                  backgroundColor: folder.accent,
                  color: T.onAccent,
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.9)',
                }}
                whileHover={{ y: -1, boxShadow: '4px 4px 0 rgba(0,0,0,0.9)' }}
                whileTap={reduce ? undefined : { rotate: 180, transition: { duration: 0.35 } }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 1 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            )}
          </div>

          <motion.div
            className="relative"
            style={{ rotate: -1.1 }}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.012 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {/* Washi tape */}
            {['-left-3 -rotate-12', '-right-3 rotate-[10deg]'].map((pos) => (
              <span
                key={pos}
                className={`absolute -top-3 ${pos} w-14 sm:w-20 h-6 z-20 pointer-events-none`}
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow: '1px 1px 0 rgba(0,0,0,0.12)',
                }}
              />
            ))}

            {/* Screen mount */}
            <div
              className="border-4 p-2 overflow-hidden"
              style={{ borderColor: LINE, backgroundColor: T.mount, boxShadow: '7px 7px 0 rgba(0,0,0,0.85)' }}
            >
              {Demo && sectionInView && (
                <Demo
                  key={`${project.demo}-${replayTick}`}
                  isDark={isDark}
                  accent={folder.accent}
                  onCycleComplete={stacked ? undefined : advance}
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Stickers + sticky note ── */}
        <div className="flex flex-col gap-4">
          <div>
            <p
              className="text-[0.6rem] font-bold uppercase tracking-[0.18em] mb-2.5"
              style={{ color: T.soft }}
            >
              Built with
            </p>
            <motion.div
              className="flex flex-wrap items-center gap-1.5 sm:gap-2"
              initial={reduce ? false : 'hidden'}
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035 } } }}
            >
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="text-[0.6rem] font-bold px-2.5 py-1 rounded-full border-2 cursor-default leading-normal"
                  style={{
                    backgroundColor: STICKER_COLORS[i % STICKER_COLORS.length],
                    borderColor: LINE,
                    color: FOLDER_INK,
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.75)',
                  }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.7 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 400, damping: 18 },
                    },
                  }}
                  whileHover={{ y: -3, scale: 1.07 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Sticky note */}
          <motion.div
            className="relative px-4 py-3.5"
            style={{
              backgroundColor: folder.note,
              rotate: 1.1,
              boxShadow: '6px 6px 0 rgba(0,0,0,0.26)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)'}`,
            }}
            whileHover={reduce ? undefined : { rotate: 0, y: -2 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          >
            <h3
              className="text-[0.63rem] font-bold uppercase tracking-[0.18em] mb-2 pb-1.5"
              style={{
                color: folder.accent,
                borderBottom: `2px dashed ${isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'}`,
              }}
            >
              What it does
            </h3>
            <p className="text-[0.78rem] leading-[1.6]" style={{ color: T.soft }}>
              {project.description}
            </p>
            {/* folded corner */}
            <span
              className="absolute bottom-0 right-0 pointer-events-none"
              style={{
                width: 0,
                height: 0,
                borderLeft: '16px solid transparent',
                borderBottom: `16px solid ${folder.body}`,
              }}
            />
          </motion.div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-[0.68rem] font-bold uppercase tracking-wider px-3.5 py-2 border-4 no-underline transition-transform hover:-translate-y-0.5"
              style={{
                borderColor: LINE,
                backgroundColor: T.paper,
                color: T.ink,
                boxShadow: '4px 4px 0 rgba(0,0,0,0.85)',
              }}
            >
              View code ↗
            </a>
          )}
        </div>
      </div>
    );
  };

  // The sheet of paper inside the folder, with a second page peeking out along
  // its bottom-right edge so it reads as a stack rather than a flat panel.
  const renderPaperStack = (idx: number, stacked: boolean) => (
    <div className="relative">
      <span
        className="absolute inset-0 border-4 hidden sm:block"
        style={{
          backgroundColor: T.page2,
          borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.55)',
          transform: 'translate(7px, 7px) rotate(0.5deg)',
        }}
      />
      <div
        className="relative border-4"
        style={{ backgroundColor: T.paper, borderColor: LINE, boxShadow: '3px 3px 0 rgba(0,0,0,0.25)' }}
      >
        {renderSheet(idx, stacked)}
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-24 sm:py-32" ref={sectionRef}>
      <Container>
        <SectionHeading label="What I've Built" title="Projects" />

        <motion.div className="-mt-6" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {/* ═══ Desktop: folder tabs + one open folder ═══ */}
          <div className="hidden lg:block">
            <div className="flex items-end pl-4" role="tablist" aria-label="Projects">
              {[...projects, null].map((_, idx) => {
                const folder = folders[idx % folders.length];
                const on = desktopIdx === idx;
                return (
                  <motion.button
                    key={labelOf(idx)}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setSelected(idx)}
                    className="relative pl-5 pr-8 font-bold whitespace-nowrap -ml-2 first:ml-0"
                    animate={{ y: on ? 0 : 6, paddingTop: on ? 13 : 10, paddingBottom: on ? 14 : 12 }}
                    whileHover={on ? undefined : { y: 2 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                    style={{
                      marginBottom: -4,
                      zIndex: on ? 20 : 10 - idx,
                      color: FOLDER_INK,
                      fontSize: '0.82rem',
                      filter: on ? 'none' : 'saturate(0.78) brightness(0.97)',
                    }}
                  >
                    {/* black shape = the border */}
                    <span
                      className="absolute inset-0"
                      style={{ background: LINE, clipPath: TAB_CLIP, borderTopLeftRadius: TAB_RADIUS }}
                    />
                    {/* colour inset on top of it, running to the bottom edge so
                        the active tab merges into the folder below */}
                    <span
                      className="absolute left-[4px] right-[4px] top-[4px] bottom-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 62%), ${
                          on ? folder.body : folder.tab
                        }`,
                        clipPath: TAB_CLIP,
                        borderTopLeftRadius: TAB_RADIUS - 3,
                      }}
                    />
                    <span className="relative flex items-center gap-2">
                      <FolderGlyph color={on ? folder.accent : 'rgba(0,0,0,0.55)'} />
                      {labelOf(idx)}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              className="relative border-4 rounded-b-xl rounded-tr-xl p-3 sm:p-4"
              animate={{ backgroundColor: folders[desktopIdx % folders.length].body }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{ borderColor: LINE, boxShadow: '8px 8px 0px #000000' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={desktopIdx}
                  initial={reduce ? false : { opacity: 0, y: 12, rotate: -0.4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                >
                  {renderPaperStack(desktopIdx, false)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ═══ Mobile: a stack of folders, one opens at a time ═══ */}
          <div className="lg:hidden flex flex-col gap-3">
            {[...projects, null].map((_, idx) => {
              const folder = folders[idx % folders.length];
              const open = selected === idx;
              return (
                <div key={labelOf(idx)}>
                  <motion.button
                    onClick={() => setSelected(open ? null : idx)}
                    aria-expanded={open}
                    className={`w-full flex items-center justify-between gap-3 border-4 px-4 py-3.5 font-bold text-left ${
                      open ? 'rounded-t-xl border-b-0' : 'rounded-xl'
                    }`}
                    animate={{
                      background: `linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%), ${
                        open ? folder.body : folder.tab
                      }`,
                    }}
                    style={{
                      borderColor: LINE,
                      color: FOLDER_INK,
                      fontSize: '0.86rem',
                      boxShadow: open ? 'none' : '4px 4px 0px #000000',
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <FolderGlyph color={folder.accent} />
                      {labelOf(idx)}
                    </span>
                    <motion.span
                      className="text-lg leading-none font-black"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      +
                    </motion.span>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden border-4 border-t-0 rounded-b-xl"
                        style={{ backgroundColor: folder.body, borderColor: LINE, boxShadow: '5px 5px 0px #000000' }}
                      >
                        <div className="p-2.5">{renderPaperStack(idx, true)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FolderGlyph({ color }: { color: string }) {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" aria-hidden="true" className="flex-shrink-0">
      <path
        d="M1 2.2C1 1.5 1.5 1 2.2 1h3.3l1.4 1.6h6.9c.7 0 1.2.5 1.2 1.2v6.8c0 .7-.5 1.2-1.2 1.2H2.2c-.7 0-1.2-.5-1.2-1.2V2.2z"
        fill={color}
        stroke="#000"
        strokeWidth="1"
      />
    </svg>
  );
}
