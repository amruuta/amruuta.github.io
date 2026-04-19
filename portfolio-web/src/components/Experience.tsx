import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';
import { useTheme } from '../lib/ThemeContext';
import logoWesternUnion from '../assets/logo-western-union.png';
import logoPersistent from '../assets/logo-persistent.jpg';
import logoClsa from '../assets/logo-clsa.jpg';

const companyLogos: Record<string, { src: string; bg: string }> = {
  'Western Union': { src: logoWesternUnion, bg: '#1C1C1C' },
  'CLSA':          { src: logoClsa,         bg: '#ffffff' },
  'Persistent Systems': { src: logoPersistent, bg: '#ffffff' },
};

export default function Experience() {
  const { experience } = portfolioData;
  const { isDark } = useTheme();

  // Keep each company card hue in dark mode with deeper solid tones.
  const bgColors = isDark
    ? ['#5B21B6', '#1E40AF', '#9A3412']
    : ['#C4B5FD', '#BFDBFE', '#FED7AA'];
  const accentColors = isDark
    ? ['#A78BFA', '#60A5FA', '#FB923C']
    : ['#7C3AED', '#1D4ED8', '#EA580C'];
  const borderColor = isDark ? '#E5E7EB' : '#000000';
  const headingColor = isDark ? '#FFFFFF' : '#000000';
  const locationChipBg = isDark ? '#0F172A' : '#F3F4F6';
  const durationChipBg = isDark ? '#111827' : '#FFFFFF';
  const cardShadow = isDark ? '4px 4px 0px rgba(148,163,184,0.5)' : '4px 4px 0px #000000';
  const cardHoverShadow = isDark ? '6px 6px 0px rgba(148,163,184,0.6)' : '6px 6px 0px #000000';

  return (
    <section id="experience" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="Experience"
          title="Work History"
        />

        <motion.div 
          className="-mt-6 sm:mt-0 relative flex flex-col gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {experience.map((job, idx) => (
            <motion.div 
              key={job.company} 
              className="flex gap-3 sm:gap-6"
              variants={fadeInUp}
              custom={0.1 + idx * 0.1}
            >
              {/* Timeline dot + line */}
              <div className="hidden sm:flex flex-col items-center flex-shrink-0 w-6">
                <div
                  className="w-4 h-4 rounded-full border-3"
                  style={{
                    backgroundColor: accentColors[idx % accentColors.length],
                    borderColor,
                  }}
                />
                {idx < experience.length - 1 && (
                  <div
                    className="flex-1"
                    style={{
                      width: 3,
                      backgroundColor: isDark ? 'rgba(229,231,235,0.7)' : '#000000',
                      marginTop: 6,
                    }}
                  />
                )}
              </div>

              {/* Job card */}
              <motion.div
                className="mb-3 sm:mb-8 flex-1 border-4 overflow-hidden"
                style={{
                  backgroundColor: bgColors[idx % bgColors.length],
                  borderColor,
                  boxShadow: cardShadow,
                }}
                whileHover={{ 
                  y: -3,
                  boxShadow: cardHoverShadow,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Accent top bar */}
                <div className="h-1 w-full" style={{ backgroundColor: accentColors[idx % accentColors.length] }} />

                {/* Card content */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    {/* Company logo */}
                    {companyLogos[job.company] && (
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center overflow-hidden p-1"
                        style={{
                          backgroundColor: companyLogos[job.company].bg,
                          borderColor,
                        }}
                        whileHover={{ scale: 1.12, rotate: -2, boxShadow: '3px 3px 0px rgba(0,0,0,0.4)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={companyLogos[job.company].src}
                          alt={`${job.company} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <span
                          className="hidden w-full h-full items-center justify-center font-black text-lg"
                          style={{ color: companyLogos[job.company].bg === '#1C1C1C' ? '#FFD700' : '#333', display: 'none' }}
                        >
                          {job.company.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </span>
                      </motion.div>
                    )}
                    <div>
                      <h3 className="font-bold text-base leading-snug" style={{ color: headingColor }}>
                        {job.position}
                      </h3>
                      <p className="text-sm font-semibold mt-1" style={{ color: accentColors[idx % accentColors.length] }}>
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                    <span
                      className="text-xs font-bold px-2.5 py-1 border-2"
                      style={{
                        color: accentColors[idx % accentColors.length],
                        borderColor,
                        backgroundColor: durationChipBg,
                      }}
                    >
                      {job.duration}
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 border-2"
                      style={{
                        borderColor,
                        backgroundColor: locationChipBg,
                        color: headingColor,
                      }}
                    >
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities border */}
                <div className="border-t-2" style={{ borderColor }} />

                {/* Responsibilities */}
                <ul className="p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-3 text-[0.92rem] sm:text-sm leading-[1.55]" style={{ color: headingColor }}>
                      <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColors[idx % accentColors.length] }} />
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
