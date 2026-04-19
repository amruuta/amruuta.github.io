import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import workingImg from '../assets/working_inverted.png';

type SkillsData = Record<string, string[]>;

// Column 1 stacks two short categories; columns 2-4 are one category each
const col1 = [
  { key: 'languages',   label: 'Programming Languages', },
  { key: 'agenticAI',   label: 'Agentic AI',            },
];
const col2to4 = [
  { key: 'backendFrameworks',   label: 'Backend & Frameworks',  },
  { key: 'cloudDevOps',         label: 'Cloud & DevOps',        },
  { key: 'softwareEngineering', label: 'Software Engineering',  },
];

function SkillTile({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.div
      className="relative border-2 border-black px-2.5 py-1.5 cursor-default"
      style={{ backgroundColor: 'transparent', boxShadow: '2px 2px 0px #000000' }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay }}
      whileHover={{ x: 3, boxShadow: '3px 3px 0px #000000', backgroundColor: 'rgba(0,0,0,0.04)', transition: { duration: 0.1 } }}
    >
      <span className="absolute top-1 left-1 w-1.5 h-1.5 block" style={{ backgroundColor: '#EF4444' }} />
      <span className="absolute bottom-1 right-1 w-1.5 h-1.5 block" style={{ backgroundColor: '#F97316' }} />
      <span className="text-[11px] font-bold text-black leading-tight">{skill}</span>
    </motion.div>
  );
}

function CategoryBlock({ cat, catIdx, skills, isInView }: { cat: { key: string; label: string }; catIdx: number; skills: SkillsData; isInView: boolean }) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: catIdx * 0.1 }}
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 border-2 border-black w-full"
        style={{ backgroundColor: '#C4B5FD', boxShadow: '3px 3px 0px #000000' }}
      >
        <span className="w-3.5 h-3.5 border-2 inline-block flex-shrink-0" style={{ borderColor: '#EF4444' }} />
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black leading-tight break-words">
          {cat.label}
        </span>
      </div>
      {(skills[cat.key] ?? []).map((skill, skillIdx) => (
        <SkillTile key={skill} skill={skill} delay={catIdx * 0.1 + skillIdx * 0.04} />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  const { skills } = portfolioData as { skills: SkillsData };
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" className="py-14 sm:py-20" ref={ref}>
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeading
            label="Expertise"
            title="Skills & Technologies"
            subtitle="Organized by domain — built through real-world production systems and hands-on experimentation."
          />

          {/* Grid wrapper is relative so image is bounded to it */}
          <div className="-mt-6 sm:mt-0 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {/* Background image — left 3 columns only, full grid height */}
            <motion.img
              src={workingImg}
              alt=""
              aria-hidden="true"
              className="hidden sm:block absolute top-0 left-0 h-full w-full lg:w-[75%] pointer-events-none select-none"
              style={{ opacity: 0.5, zIndex: 0, objectFit: 'cover', objectPosition: 'center top' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            />

            {/* Column 1: Programming Languages + Agentic AI stacked */}
            <div className="flex flex-col gap-4 sm:gap-6" style={{ position: 'relative', zIndex: 1 }}>
              {col1.map((cat, i) => (
                <CategoryBlock key={cat.key} cat={cat} catIdx={i} skills={skills} isInView={isInView} />
              ))}
            </div>

            {/* Columns 2–4 */}
            {col2to4.map((cat, i) => (
              <div key={cat.key} style={{ position: 'relative', zIndex: 1 }}>
                <CategoryBlock cat={cat} catIdx={i + 2} skills={skills} isInView={isInView} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
