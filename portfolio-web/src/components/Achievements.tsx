import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

export default function Achievements() {
  const { awards, certifications } = portfolioData;

  // Teal + Rose celebration color scheme
  const colors = {
    teal: '#14B8A6',
    teaLight: '#CCEDE9',
    rose: '#EC4899',
    roseLip: '#FFF0F5',
  };

  return (
    <section id="achievements" className="py-24 bg-white">
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
                className="border-4 border-black p-5 bg-white"
                style={{ backgroundColor: colors.teaLight }}
                variants={fadeInUp}
                custom={0.1 + i * 0.08}
                whileHover={{ 
                  y: -4,
                  boxShadow: '8px 8px 0px #000000',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0 mt-1" style={{ color: colors.teal }}>★</span>
                  <p className="text-sm font-semibold leading-relaxed text-black">
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
                className="border-4 border-black p-5 bg-white"
                style={{ backgroundColor: colors.roseLip }}
                variants={fadeInUp}
                custom={0.1 + idx * 0.08}
                whileHover={{ 
                  y: -4,
                  boxShadow: '8px 8px 0px #000000',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                    style={{ backgroundColor: colors.rose }}
                  >
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black">{cert.name}</p>
                    <p className="text-xs text-gray-700 mt-1">Issued by {cert.issuer}</p>
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

