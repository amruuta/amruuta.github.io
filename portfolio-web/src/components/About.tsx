import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import workingImg from '../assets/working.png';

// Vibrant accent colors - Violet + Cyan
const colors = {
  violet: '#8B5CF6',
  violetLight: '#EDE9FE',
  cyan: '#06B6D4',
  cyanLight: '#CFFAFE',
};

export default function About() {
  const { personal, experience, about } = portfolioData;
  const primaryStat = about.stats[0];
  const { bio } = about;

  return (
    <section id="about" className="py-3 lg:py-5">
      <Container>
        <SectionHeading 
          compact
          label="About" 
          title={`${personal.name} — ${personal.title}`}
          subtitle="A backend engineer obsessed with scalable systems and clean architecture"
        />

        {/* Main content grid: blocks left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-4 lg:gap-8 items-start">
          {/* Left: Blocks stacked */}
          <motion.div 
            className="min-w-0 flex flex-col gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Who I am block */}
            <motion.div
              className="p-3 lg:p-4 border-4 border-black"
              style={{
                backgroundColor: colors.violetLight,
                boxShadow: '4px 4px 0px #000000',
              }}
              variants={fadeInUp}
              custom={0.1}
              whileHover={{ 
                y: -2,
                boxShadow: '6px 6px 0px #000000',
              }}
            >
              <h3 className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: colors.violet }}>
                WHO I AM
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-medium">
                {bio}
              </p>
            </motion.div>

            {/* Two blocks side by side under Who I Am */}
            <div className="grid grid-cols-2 gap-3">
              {/* Experience stat */}
              <motion.div
                className="p-3 border-4 border-black text-center"
                style={{
                  backgroundColor: colors.violetLight,
                  boxShadow: '4px 4px 0px #000000',
                }}
                variants={fadeInUp}
                custom={0.2}
                whileHover={{ 
                  y: -3,
                  boxShadow: '6px 6px 0px #000000',
                }}
              >
                <div className="text-3xl font-black mb-1" style={{ color: colors.violet }}>
                  {primaryStat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-700 mb-0.5">
                  {primaryStat.label}
                </div>
                <div className="text-xs text-gray-600 font-semibold">
                  {primaryStat.desc}
                </div>
              </motion.div>

              {/* Current role info */}
              <motion.div
                className="p-3 border-4 border-black"
                style={{
                  backgroundColor: '#FFF9E6',
                  boxShadow: '4px 4px 0px #000000',
                }}
                variants={fadeInUp}
                custom={0.3}
                whileHover={{ 
                  y: -3,
                  boxShadow: '6px 6px 0px #000000',
                }}
              >
                <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-1">Active</p>
                <p className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                  {experience[0].position}
                </p>
                <p className="text-xs text-gray-700">{experience[0].company} · {experience[0].location}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Working image */}
          <motion.div
            className="flex items-start justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={viewport}
          >
            <img
              src={workingImg}
              alt="Working illustration"
              className="w-full max-h-[460px] object-contain object-top drop-shadow-xl"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
