import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';

export default function Publications() {
  const { personal } = portfolioData;
  const { isDark } = useTheme();
  
  // Orange + Rose creative content color scheme
  const colors = {
    orange: '#F97316',
    orangeLight: '#FFEDD5',
    orangeDark: '#B8530A',
    rose: '#EC4899',
    roseLip: '#FFF0F5',
  };

  return (
    <section id="publications" className="py-24">
      <Container>
        <SectionHeading
          label="Publications"
          title="Articles & Writing"
          subtitle="Technical articles and thought leadership."
        />

        <motion.div
          className="flex flex-col items-center justify-center gap-8 py-16 border-4 max-w-2xl mx-auto"
          style={{
            backgroundColor: isDark ? colors.orangeDark : colors.orangeLight,
            borderColor: isDark ? '#e5e7eb' : '#000000',
            boxShadow: isDark ? '6px 6px 0px rgba(148,163,184,0.5)' : '6px 6px 0px #000000',
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          whileHover={{ 
            boxShadow: isDark ? '8px 8px 0px rgba(148,163,184,0.6)' : '8px 8px 0px #000000',
            transition: { duration: 0.2 }
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded border-3"
            style={{ 
              backgroundColor: isDark ? '#FB923C' : colors.orange,
              borderColor: isDark ? '#FB923C' : '#000000'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ margin: '12px auto' }}>
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>

          {/* Content */}
          <div className="text-center">
            <p className="font-bold text-lg" style={{ color: isDark ? '#fff' : '#000' }}>Coming Soon</p>
            <p className="text-sm mt-3 max-w-sm" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
              Technical write-ups and articles are on the way. Follow on LinkedIn for updates.
            </p>
          </div>

          {/* CTA Link */}
          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-bold px-5 py-2.5 border-3 transition-all"
            style={{ 
              backgroundColor: isDark ? '#1F2937' : '#000000',
              borderColor: isDark ? '#4B5563' : '#000000',
              color: '#fff'
            }}
            whileHover={{ 
              backgroundColor: isDark ? '#F472B6' : colors.rose,
              borderColor: isDark ? '#F472B6' : colors.rose,
              transition: { duration: 0.2 }
            }}
          >
            Follow on LinkedIn ↗
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
