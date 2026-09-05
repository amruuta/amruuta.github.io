import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';
import logoWesternUnion from '../assets/logo-western-union.png';
import logoPersistent from '../assets/logo-persistent.jpg';
import logoClsa from '../assets/logo-clsa.jpg';

const companyLogos: Record<string, { src: string; bg: string }> = {
  'Western Union': { src: logoWesternUnion, bg: '#1C1C1C' },
  'CLSA':          { src: logoClsa,         bg: '#ffffff' },
  'Persistent Systems': { src: logoPersistent, bg: '#ffffff' },
};

// Tracks which way the page is actually being scrolled, so the rail's glow
// can travel in the same direction the user is moving through the timeline —
// downward on the way down, upward on the way back up — instead of always
// animating top-to-bottom regardless of direction.
function useScrollDirection() {
  const [dir, setDir] = useState<'down' | 'up'>('down');

  useEffect(() => {
    let lastY = window.scrollY;
    let raf: number | null = null;

    const measure = () => {
      raf = null;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 2) {
        setDir(y > lastY ? 'down' : 'up');
        lastY = y;
      }
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return dir;
}

type Job = (typeof portfolioData)['experience'][number];

interface RoleCardProps {
  job: Job;
  idx: number;
  isLast: boolean;
  accent: string;
  bg: string;
  isDark: boolean;
  reduce: boolean;
  scrollDir: 'down' | 'up';
}

// Each role starts collapsed to just its header. When the header reaches the
// middle band of the viewport it opens on its own, one card after another as
// you scroll — the dot and the rail segment below it light up at the same
// moment. Clicking a header still toggles it manually.
function RoleCard({ job, idx, isLast, accent, bg, isDark, reduce, scrollDir }: RoleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Fully reversible: the card opens when it comes into view and closes again
  // once it leaves, in either scroll direction. Watching the whole card (not
  // just its header) means it stays open the entire time it's on screen, so
  // scrolling back up re-opens the last card first and works its way back.
  // Opens once, on the way in, and stays open.
  //
  // Closing a card when it scrolled out of view collapsed the section by ~780px
  // mid-scroll, which shrank the document under the reader and threw the page
  // straight past this section into Projects — and once collapsed the cards
  // never came back, so scrolling up showed nothing. Latching them open means
  // the only height change happens as a card enters from below, which pushes
  // content down *below* the reading position instead of yanking it up.
  const inView = useInView(cardRef, { once: true, margin: '0px 0px -15% 0px' });
  const open = reduce ? true : inView;

  const borderColor = isDark ? '#E5E7EB' : '#000000';
  const headingColor = isDark ? '#FFFFFF' : '#000000';
  const locationChipBg = isDark ? '#0F172A' : '#F3F4F6';
  const durationChipBg = isDark ? '#111827' : '#FFFFFF';
  const cardShadow = isDark ? '4px 4px 0px rgba(148,163,184,0.5)' : '4px 4px 0px #000000';
  const cardHoverShadow = isDark ? '6px 6px 0px rgba(148,163,184,0.6)' : '6px 6px 0px #000000';
  const railBase = isDark ? 'rgba(229,231,235,0.25)' : 'rgba(0,0,0,0.18)';

  return (
    <motion.div className="flex gap-3 sm:gap-6" variants={fadeInUp} custom={0.1 + idx * 0.1}>
      {/* Timeline rail — dot lights up, segment fills downward as it opens */}
      <div className="hidden sm:flex flex-col items-center flex-shrink-0 w-6">
        <motion.div
          className="rounded-full flex-shrink-0"
          style={{ width: 18, height: 18, border: `3px solid ${borderColor}` }}
          animate={{
            backgroundColor: open ? accent : isDark ? '#1F2937' : '#FFFFFF',
            boxShadow: open
              ? `0 0 10px ${accent}, 0 0 22px ${accent}, 0 0 34px ${accent}88`
              : `0 0 0px ${accent}00`,
            scale: open ? 1.1 : 1,
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />

        {!isLast && (
          <div className="flex-1 relative" style={{ width: 4, marginTop: 6 }}>
            {/* dim base rail */}
            <div className="absolute inset-0" style={{ backgroundColor: railBase }} />
            {/* Glowing progress rail. Grows from the top when scrolling down
                (light flows downward, matching scroll direction) and from the
                bottom when scrolling up (light flows upward instead). */}
            <motion.div
              className="absolute inset-x-0 top-0"
              style={{
                backgroundColor: accent,
                transformOrigin: scrollDir === 'up' ? 'bottom' : 'top',
                boxShadow: `0 0 8px ${accent}, 0 0 16px ${accent}aa`,
                height: '100%',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: open ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut', delay: open ? 0.15 : 0 }}
            />
          </div>
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="mb-3 sm:mb-8 flex-1 border-4 overflow-hidden"
        style={{ backgroundColor: bg, borderColor, boxShadow: cardShadow }}
        whileHover={{ y: -3, boxShadow: cardHoverShadow, transition: { duration: 0.2 } }}
      >
        <div className="h-1 w-full" style={{ backgroundColor: accent }} />

        {/* Header — always visible */}
        <div
          aria-expanded={open}
          className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            {companyLogos[job.company] && (
              <motion.div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center overflow-hidden p-1"
                style={{ backgroundColor: companyLogos[job.company].bg, borderColor }}
                whileHover={{ scale: 1.12, rotate: -2 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={companyLogos[job.company].src}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}
            <div>
              <h3 className="font-bold text-base leading-snug" style={{ color: headingColor }}>
                {job.position}
              </h3>
              <p className="text-sm font-semibold mt-1" style={{ color: accent }}>
                {job.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <span
              className="text-xs font-bold px-2.5 py-1 border-2"
              style={{ color: accent, borderColor, backgroundColor: durationChipBg }}
            >
              {job.duration}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-1 border-2"
              style={{ borderColor, backgroundColor: locationChipBg, color: headingColor }}
            >
              {job.location}
            </span>
            {/* open/closed caret */}
            <motion.span
              className="text-lg font-black leading-none ml-0.5"
              style={{ color: accent }}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              ⌄
            </motion.span>
          </div>
        </div>

        {/* Responsibilities — expand on scroll */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.3 } }}
              style={{ overflow: 'hidden' }}
            >
              <div className="border-t-2" style={{ borderColor }} />
              <ul className="p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3">
                {job.responsibilities.map((r, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 text-[0.92rem] sm:text-sm leading-[1.55]"
                    style={{ color: headingColor }}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, ease: 'easeOut', delay: reduce ? 0 : 0.12 + i * 0.055 }}
                  >
                    <span
                      className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <span>{r}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const { experience } = portfolioData;
  const { isDark } = useTheme();
  const reduce = !!useReducedMotion();
  const scrollDir = useScrollDirection();

  const bgColors = isDark
    ? ['#5B21B6', '#1E40AF', '#9A3412']
    : ['#C4B5FD', '#BFDBFE', '#FED7AA'];
  const accentColors = isDark
    ? ['#A78BFA', '#60A5FA', '#FB923C']
    : ['#7C3AED', '#1D4ED8', '#EA580C'];

  return (
    <section id="experience" className="py-16 sm:py-24">
      <Container>
        <SectionHeading label="Experience" title="Work History" />

        <motion.div
          className="-mt-6 sm:mt-0 relative flex flex-col gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {experience.map((job, idx) => (
            <RoleCard
              key={job.company}
              job={job}
              idx={idx}
              isLast={idx === experience.length - 1}
              accent={accentColors[idx % accentColors.length]}
              bg={bgColors[idx % bgColors.length]}
              isDark={isDark}
              reduce={reduce}
              scrollDir={scrollDir}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
