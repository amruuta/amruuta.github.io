import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import HeroTerminal from './HeroTerminal';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
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
          {/* Status badge - Neo-Brutalism */}
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={fadeInUp}
            custom={0.1}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black text-xs font-bold tracking-widest uppercase"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                boxShadow: '2px 2px 0px #000000',
              }}
            >
              <span
                className="w-2 h-2 bg-brand"
                style={{ boxShadow: 'none' }}
              />
              Open to opportunities
            </span>
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
            className="flex flex-wrap gap-4 justify-center"
            style={{ marginTop: '14px' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={fadeInUp} 
              custom={0.4}
              whileHover={{ scale: 1.04, translateY: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <Button href="#projects" variant="primary">
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </motion.div>
            <motion.div 
              variants={fadeInUp} 
              custom={0.45}
              whileHover={{ scale: 1.04, translateY: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <Button href="#contact" variant="secondary">
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Meta info - Neo-Brutalism */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center text-[0.85rem] font-medium text-black"
            style={{
              borderTop: '4px solid #000000',
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
