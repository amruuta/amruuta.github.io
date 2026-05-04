import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';

export default function Education() {
  const { education } = portfolioData;
  const { isDark } = useTheme();

  // Blue + Cyan academic color scheme
  const colors = {
    blue: '#0EA5E9',
    blueLight: '#CFF0FE',
    cyan: '#06B6D4',
    cyanLight: '#CFFAFE',
  };

  return (
    <section id="education" className="py-24">
      <Container>
        <SectionHeading label="Education" title="Academic Background" subtitle="" />

        <motion.div 
          className="flex flex-col gap-5 max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {education.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              className="border-4 overflow-hidden"
              style={{
                borderColor: isDark ? '#e5e7eb' : '#000000',
                backgroundColor: isDark 
                  ? (idx % 2 === 0 ? '#2563eb' : '#0891b2')
                  : (idx % 2 === 0 ? colors.blueLight : colors.cyanLight),
                boxShadow: isDark ? '4px 4px 0px rgba(148,163,184,0.5)' : '4px 4px 0px #000000',
              }}
              variants={fadeInUp}
              custom={0.1 + idx * 0.08}
              whileHover={{ 
                y: -3,
                boxShadow: isDark ? '6px 6px 0px rgba(148,163,184,0.6)' : '4px 4px 0px #000000',
                transition: { duration: 0.2 }
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: isDark ? (idx % 2 === 0 ? '#60A5FA' : '#67E8F9') : (idx % 2 === 0 ? colors.blue : colors.cyan) }}
              />
              
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      backgroundColor: isDark ? (idx % 2 === 0 ? '#60A5FA' : '#67E8F9') : (idx % 2 === 0 ? colors.blue : colors.cyan),
                      borderColor: isDark ? '#e5e7eb' : '#000000',
                      color: isDark ? '#000' : '#fff',
                    }}
                  >
                    🎓
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base leading-snug" style={{ color: isDark ? '#fff' : '#000' }}>
                      {edu.degree}
                    </h3>
                    <p
                      className="font-semibold text-sm mt-1"
                      style={{ color: isDark ? '#fff' : (idx % 2 === 0 ? colors.blue : colors.cyan) }}
                    >
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 border-2"
                        style={{ 
                          backgroundColor: isDark ? '#1f2937' : '#ffffff',
                          borderColor: isDark ? '#e5e7eb' : '#000000',
                          color: isDark ? '#fff' : (idx % 2 === 0 ? colors.blue : colors.cyan)
                        }}
                      >
                        {edu.year}
                      </span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 border-2"
                        style={{ 
                          backgroundColor: isDark ? (idx % 2 === 0 ? '#60A5FA' : '#67E8F9') : (idx % 2 === 0 ? colors.blue : colors.cyan),
                          borderColor: isDark ? '#e5e7eb' : '#000000',
                          color: isDark ? '#000' : '#fff'
                        }}
                      >
                        {edu.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
