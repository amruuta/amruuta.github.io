import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';

export default function Achievements() {
  const { awards, certifications } = portfolioData;
  const { isDark } = useTheme();

  // Teal + Rose celebration color scheme
  const colors = {
    teal: '#14B8A6',
    teaLight: '#CCEDE9',
    tealDark: '#0F7979',
    rose: '#EC4899',
    roseLip: '#FFF0F5',
    roseDark: '#9D3D65',
  };

  return (
    <section id="achievements" className="py-24">
      <Container>
        <SectionHeading
          label="Achievements"
          title="Recognition & Certifications"
          subtitle="Recognition and professional credentials."
        />

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Awards */}
          <motion.div 
            className="flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: colors.teal }}>Awards</h3>
              <div className="flex-1 h-1 border-b-2 border-black" />
            </div>

            {awards.map((award, i) => (
              <motion.div
                key={i}
                className="border-4 border-black p-5"
                style={{ 
                  backgroundColor: isDark ? colors.tealDark : colors.teaLight,
                  borderColor: isDark ? '#e5e7eb' : '#000000'
                }}
                variants={fadeInUp}
                custom={0.1 + i * 0.08}
                whileHover={{ 
                  y: -4,
                  boxShadow: isDark ? '8px 8px 0px rgba(148,163,184,0.5)' : '8px 8px 0px #000000',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0 mt-1" style={{ color: isDark ? '#5EEAD4' : colors.teal }}>★</span>
                  <p className="text-sm font-semibold leading-relaxed" style={{ color: isDark ? '#fff' : '#000' }}>
                    {award}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div 
            className="flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: colors.rose }}>Certifications</h3>
              <div className="flex-1 h-1 border-b-2 border-black" />
            </div>

            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                className="border-4 border-black p-5"
                style={{ 
                  backgroundColor: isDark ? colors.roseDark : colors.roseLip,
                  borderColor: isDark ? '#e5e7eb' : '#000000'
                }}
                variants={fadeInUp}
                custom={0.1 + idx * 0.08}
                whileHover={{ 
                  y: -4,
                  boxShadow: isDark ? '8px 8px 0px rgba(148,163,184,0.5)' : '8px 8px 0px #000000',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                    style={{ 
                      backgroundColor: isDark ? '#F472B6' : colors.rose,
                      borderColor: isDark ? '#F472B6' : colors.rose
                    }}
                  >
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{ color: isDark ? '#fff' : '#000' }}>{cert.name}</p>
                    <p className="text-xs mt-1" style={{ color: isDark ? '#d1d5db' : '#374151' }}>Issued by {cert.issuer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

