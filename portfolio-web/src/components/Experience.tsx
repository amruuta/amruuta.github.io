import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

export default function Experience() {
  const { experience } = portfolioData;

  // Purple + Fuchsia professional growth color scheme
  const colors = {
    purple: '#A855F7',
    purpleLight: '#F3E8FF',
    fuchsia: '#D946EF',
    fuchsiaLight: '#FDF1FB',
  };

  return (
    <section id="experience" className="py-24">
      <Container>
        <SectionHeading
          label="Experience"
          title="Work History"
          subtitle="Backend engineering across trading, risk management, and financial platforms."
        />

        <motion.div 
          className="relative flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {experience.map((job, idx) => (
            <motion.div 
              key={job.company} 
              className="flex gap-6"
              variants={fadeInUp}
              custom={0.1 + idx * 0.1}
            >
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center flex-shrink-0 w-6">
                <div
                  className="w-4 h-4 rounded-full border-3 border-black"
                  style={{
                    backgroundColor: idx % 2 === 0 ? colors.purple : colors.fuchsia,
                  }}
                />
                {idx < experience.length - 1 && (
                  <div
                    className="flex-1"
                    style={{
                      width: 3,
                      backgroundColor: '#000000',
                      marginTop: 6,
                    }}
                  />
                )}
              </div>

              {/* Job card */}
              <motion.div
                className="mb-8 flex-1 border-4 border-black overflow-hidden bg-white"
                style={{
                  backgroundColor: idx % 2 === 0 ? colors.purpleLight : colors.fuchsiaLight,
                  boxShadow: '4px 4px 0px #000000',
                }}
                whileHover={{ 
                  y: -3,
                  boxShadow: '4px 4px 0px #000000',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Accent top bar */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: idx % 2 === 0 ? colors.purple : colors.fuchsia }}
                />

                {/* Card content */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base text-black leading-snug">
                      {job.position}
                    </h3>
                    <p className="text-sm font-semibold mt-1" style={{ color: idx % 2 === 0 ? colors.purple : colors.fuchsia }}>
                      {job.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                    <span
                      className="text-xs font-bold px-2.5 py-1 border-2 border-black bg-white"
                      style={{ color: idx % 2 === 0 ? colors.purple : colors.fuchsia }}
                    >
                      {job.duration}
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 border-2 border-black bg-gray-100"
                    >
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities border */}
                <div className="border-t-2 border-black" />

                {/* Responsibilities */}
                <ul className="p-6 flex flex-col gap-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-[1.6] text-black">
                      <span
                        className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: idx % 2 === 0 ? colors.purple : colors.fuchsia }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
