import { motion } from 'framer-motion';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, viewport } from '../lib/animations';

export default function Publications() {
  // Orange + Rose creative content color scheme
  const colors = {
    orange: '#F97316',
    orangeLight: '#FFEDD5',
    rose: '#EC4899',
    roseLip: '#FFF0F5',
  };

  return (
    <section id="publications" className="py-24 bg-white">
      <Container>
        <SectionHeading
          label="Publications"
          title="Articles & Writing"
          subtitle="Technical articles and thought leadership."
        />

        <motion.div
          className="flex flex-col items-center justify-center gap-8 py-16 border-4 border-black bg-white max-w-2xl mx-auto"
          style={{
            backgroundColor: colors.orangeLight,
            boxShadow: '6px 6px 0px #000000',
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          whileHover={{ 
            boxShadow: '8px 8px 0px #000000',
            transition: { duration: 0.2 }
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded border-3 border-black flex items-center justify-center"
            style={{ backgroundColor: colors.orange }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>

          {/* Content */}
          <div className="text-center">
            <p className="font-bold text-lg text-black">Coming Soon</p>
            <p className="text-sm text-gray-700 mt-3 max-w-sm">
              Technical write-ups and articles are on the way. Follow on LinkedIn for updates.
            </p>
          </div>

          {/* CTA Link */}
          <motion.a
            href="https://www.linkedin.com/in/amruta-bendale"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-bold px-5 py-2.5 border-3 border-black bg-black text-white transition-all"
            style={{ color: '#fff' }}
            whileHover={{ 
              backgroundColor: colors.rose,
              borderColor: colors.rose,
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
