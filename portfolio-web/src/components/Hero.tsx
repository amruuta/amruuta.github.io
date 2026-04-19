import { motion } from 'framer-motion';
import Container from './ui/Container';
import HeroTerminal from './HeroTerminal';
import { portfolioData } from '../data/portfolioData';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';

export default function Hero() {
  const { isDark } = useTheme();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-12 overflow-hidden"
    >
      <Container className="w-full relative py-2">
        <motion.div 
          className="w-full"
          style={{ maxWidth: '900px', margin: '0 auto' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Status badge - animated hover sweep */}
          <motion.div
            className="flex items-center justify-center mb-6 mt-8"
            variants={fadeInUp}
            custom={0.1}
          >
            <motion.div
              className={`group relative inline-flex items-center gap-2.5 px-5 py-2.5 border-2 text-xs font-black tracking-widest uppercase overflow-hidden cursor-default select-none ${isDark ? 'border-white' : 'border-black'}`}
              style={{
                backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
                boxShadow: isDark ? '3px 3px 0px #ffffff' : '3px 3px 0px #000000',
              }}
              whileHover={{ y: -4, boxShadow: isDark ? '5px 5px 0px #ffffff' : '5px 5px 0px #000000' }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              {/* Green sweep fill — CSS group-hover, reliable on all children */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                style={{ backgroundColor: '#16a34a', transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
              />
              {/* Dot */}
              <span className="relative z-10 w-2.5 h-2.5 rounded-full flex-shrink-0 bg-green-500 group-hover:bg-white group-hover:scale-150 transition-all duration-200" />
              {/* Label */}
              <span className={`relative z-10 group-hover:text-white transition-colors duration-200 ${isDark ? 'text-gray-100' : 'text-black'}`}>
                Open to opportunities
              </span>
              {/* Checkmark */}
              <span
                className="relative z-10 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 delay-150"
                style={{ color: '#bbf7d0' }}
              >
                ✓
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Terminal Component */}
          <motion.div 
            variants={fadeInUp}
            custom={0.2}
            style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ maxWidth: '650px', width: '100%' }}>
              <HeroTerminal />
            </div>
          </motion.div>

          {/* Tagline - Neo-Brutalism */}
          <motion.p
            className="text-base text-center text-black"
            style={{ 
              lineHeight: '1.75',
              maxWidth: '600px',
              margin: '0 auto',
              marginTop: '12px',
              letterSpacing: '-0.2px',
            }}
            variants={fadeInUp}
            custom={0.3}
          >
            Building high-throughput financial systems, distributed services, and 
            event-driven platforms. Exploring the frontier of{' '}
            <span style={{ color: '#000000', fontWeight: '700' }}>Agentic AI</span>.
          </motion.p>

          {/* CTAs with micro-interactions */}
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            style={{ marginTop: '14px' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Get In Touch — solid red */}
            <motion.div variants={fadeInUp} custom={0.4}>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black font-black text-xs uppercase tracking-widest text-white"
                style={{
                  backgroundColor: '#EF4444',
                  boxShadow: isDark ? '4px 4px 0px #ffffff' : '4px 4px 0px #000000',
                }}
                whileHover={{ y: -3, boxShadow: isDark ? '6px 6px 0px #ffffff' : '6px 6px 0px #000000', scale: 1.03 }}
                whileTap={{ y: 1, boxShadow: isDark ? '2px 2px 0px #ffffff' : '2px 2px 0px #000000', scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get In Touch
              </motion.a>
            </motion.div>

            {/* View Experience — solid violet */}
            <motion.div variants={fadeInUp} custom={0.45}>
              <motion.a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black font-black text-xs uppercase tracking-widest text-white"
                style={{
                  backgroundColor: '#7C3AED',
                  boxShadow: isDark ? '4px 4px 0px #ffffff' : '4px 4px 0px #000000',
                }}
                whileHover={{ y: -3, boxShadow: isDark ? '6px 6px 0px #ffffff' : '6px 6px 0px #000000', scale: 1.03 }}
                whileTap={{ y: 1, boxShadow: isDark ? '2px 2px 0px #ffffff' : '2px 2px 0px #000000', scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
                View Experience
              </motion.a>
            </motion.div>

            {/* Resume — solid amber, download */}
            <motion.div variants={fadeInUp} custom={0.5}>
              <motion.a
                href={(portfolioData.personal as any).resume || '#'}
                download="AmrutaBendale_SoftwareDeveloper.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black font-black text-xs uppercase tracking-widest text-black"
                style={{
                  backgroundColor: '#F59E0B',
                  boxShadow: isDark ? '4px 4px 0px #ffffff' : '4px 4px 0px #000000',
                }}
                whileHover={{ y: -3, boxShadow: isDark ? '6px 6px 0px #ffffff' : '6px 6px 0px #000000', scale: 1.03 }}
                whileTap={{ y: 1, boxShadow: isDark ? '2px 2px 0px #ffffff' : '2px 2px 0px #000000', scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Meta info - Neo-Brutalism */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center text-[0.85rem] font-medium text-black"
            style={{
              borderTop: isDark ? '4px solid #ffffff' : '4px solid #000000',
              marginTop: '16px',
              paddingTop: '12px',
            }}
            variants={fadeInUp}
            custom={0.5}
          >
            <span className="flex items-center gap-2">
              <span>📍</span>
              Pune, India
            </span>
            <span className="flex items-center gap-2">
              <span>⚙️</span>
              ~4 years experience
            </span>
            <motion.a
              href="https://www.linkedin.com/in/amruta-bendale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black font-bold"
              whileHover={{ translateX: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span>↗</span>
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
