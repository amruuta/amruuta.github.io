import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

// Creative color palette - Red + Orange interactive lab
const skillColors = {
  primary: '#EF4444',
  secondary: '#F97316',
  primaryLight: 'rgba(239, 68, 68, 0.08)',
  secondaryLight: 'rgba(249, 115, 22, 0.08)',
};

export default function Skills() {
  const { skills } = portfolioData;

  // Flatten all skills from categories
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="py-32 bg-white">
      <Container>
        <SectionHeading
          label="Expertise"
          title="Interactive Skill Lab"
          subtitle="Technologies and frameworks shaped through hands-on experimentation and real-world application."
        />

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {allSkills.map((skill, idx) => (
            <motion.div
              key={`${skill}-${idx}`}
              className="group relative"
              variants={fadeInUp}
              custom={0.08 + idx * 0.03}
            >
              <motion.div
                className="relative border-3 px-4 py-3 text-center transition-all duration-200 cursor-default"
                style={{
                  borderColor: idx % 2 === 0 ? skillColors.primary : skillColors.secondary,
                  backgroundColor: idx % 2 === 0 ? skillColors.primaryLight : skillColors.secondaryLight,
                  boxShadow: '3px 3px 0px #000000',
                }}
                whileHover={{
                  y: -3,
                  boxShadow: '5px 5px 0px #000000',
                  backgroundColor: idx % 2 === 0 
                    ? 'rgba(239, 68, 68, 0.15)' 
                    : 'rgba(249, 115, 22, 0.15)',
                  scale: 1.02,
                  transition: { duration: 0.15 }
                }}
              >
                {/* Subtle corner accents */}
                <div
                  className="absolute top-1 left-1 w-1.5 h-1.5"
                  style={{
                    backgroundColor: idx % 2 === 0 ? skillColors.primary : skillColors.secondary,
                  }}
                />
                <div
                  className="absolute bottom-1 right-1 w-1.5 h-1.5"
                  style={{
                    backgroundColor: idx % 2 === 0 ? skillColors.primary : skillColors.secondary,
                  }}
                />

                {/* Skill label */}
                <p className="text-sm font-bold uppercase tracking-wide text-black">
                  {skill}
                </p>
              </motion.div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 border-3 pointer-events-none rounded-none"
                style={{
                  borderColor: idx % 2 === 0 ? skillColors.primary : skillColors.secondary,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 0.3,
                  boxShadow: `0 0 16px ${idx % 2 === 0 ? skillColors.primary : skillColors.secondary}`,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Legend / Note */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div 
            className="flex items-center gap-3"
            variants={fadeInUp}
            custom={0.3}
          >
            <div 
              className="w-6 h-6 border-2"
              style={{
                borderColor: skillColors.primary,
                backgroundColor: skillColors.primaryLight,
              }}
            />
            <span className="text-sm font-semibold text-gray-700">Backend & Data</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3"
            variants={fadeInUp}
            custom={0.4}
          >
            <div 
              className="w-6 h-6 border-2"
              style={{
                borderColor: skillColors.secondary,
                backgroundColor: skillColors.secondaryLight,
              }}
            />
            <span className="text-sm font-semibold text-gray-700">Frontend & DevOps</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
