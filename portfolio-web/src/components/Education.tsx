import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

export default function Education() {
  const { education } = portfolioData;

  // Blue + Cyan academic color scheme
  const colors = {
    blue: '#0EA5E9',
    blueLight: '#CFF0FE',
    cyan: '#06B6D4',
    cyanLight: '#CFFAFE',
  };

  return (
    <section id="education" className="py-24 bg-white">
      <Container>
        <SectionHeading label="Education" title="Academic Background" subtitle="BSE Computer Science Education" />

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
              className="border-4 border-black overflow-hidden bg-white"
              style={{
                backgroundColor: idx % 2 === 0 ? colors.blueLight : colors.cyanLight,
                boxShadow: '4px 4px 0px #000000',
              }}
              variants={fadeInUp}
              custom={0.1 + idx * 0.08}
              whileHover={{ 
                y: -3,
                boxShadow: '4px 4px 0px #000000',
                transition: { duration: 0.2 }
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: idx % 2 === 0 ? colors.blue : colors.cyan }}
              />
              
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded border-2 border-black flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      backgroundColor: idx % 2 === 0 ? colors.blue : colors.cyan,
                      color: '#fff',
                    }}
                  >
                    🎓
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-black leading-snug">
                      {edu.degree}
                    </h3>
                    <p
                      className="font-semibold text-sm mt-1"
                      style={{ color: idx % 2 === 0 ? colors.blue : colors.cyan }}
                    >
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 border-2 border-black bg-white"
                        style={{ color: idx % 2 === 0 ? colors.blue : colors.cyan }}
                      >
                        {edu.year}
                      </span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 border-2 border-black text-white"
                        style={{ backgroundColor: idx % 2 === 0 ? colors.blue : colors.cyan }}
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
