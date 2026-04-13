import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, fadeIn, staggerContainer, viewport } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

// Creative color palette for projects - Indigo + Cyan
const projectColors = [
  { border: '#4F46E5', bg: 'rgba(79, 70, 229, 0.04)', hover: '#6366F1', glow: 'rgba(99, 102, 241, 0.3)' },
  { border: '#06B6D4', bg: 'rgba(6, 182, 212, 0.04)', hover: '#22D3EE', glow: 'rgba(34, 211, 238, 0.3)' },
  { border: '#4F46E5', bg: 'rgba(79, 70, 229, 0.04)', hover: '#6366F1', glow: 'rgba(99, 102, 241, 0.3)' },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { projects } = portfolioData;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('[data-project-card]');
      
      cards?.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: idx * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 0.2,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-32 bg-white">
      <Container>
        <SectionHeading
          label="Work"
          title="Creative Studio Showcase"
          subtitle="Engineered solutions that solve real problems — from data analysis to distributed systems."
        />

        {/* Masonry-style grid with varied column spans */}
        <motion.div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {projects.map((project, idx) => {
            const colorScheme = projectColors[idx % projectColors.length];
            const masonrySpan = idx === 0 ? 'md:col-span-2' : idx === 1 ? 'md:row-span-2' : '';
            
            return (
              <motion.div
                data-project-card
                key={project.name}
                className={`relative border-4 flex flex-col p-8 group cursor-pointer transition-all duration-300 ${masonrySpan}`}
                style={{
                  borderColor: colorScheme.border,
                  backgroundColor: colorScheme.bg,
                  boxShadow: `4px 4px 0px #000000`,
                }}
                variants={fadeInUp}
                custom={0.1 + idx * 0.08}
                whileHover={{ 
                  y: -6, 
                  boxShadow: `6px 6px 0px #000000, 0 0 20px ${colorScheme.glow}`,
                  rotate: idx % 2 === 0 ? 1 : -1,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Accent corner mark */}
                <div
                  className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4"
                  style={{ borderColor: colorScheme.border }}
                />

                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px my-4"
                  style={{ backgroundColor: colorScheme.border, opacity: 0.3 }}
                />

                {/* Tech stack with color chips */}
                <motion.div 
                  className="flex flex-wrap gap-2 mt-auto"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {project.technologies.map((tech, techIdx) => (
                    <motion.span
                      key={tech}
                      className="text-xs font-bold px-3 py-1.5 border-2 uppercase tracking-wide"
                      style={{
                        borderColor: colorScheme.border,
                        color: colorScheme.border,
                        backgroundColor: colorScheme.bg,
                      }}
                      variants={fadeIn}
                      custom={0.02 + techIdx * 0.02}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Coming soon card */}
          <motion.div
            className="relative border-4 border-dashed flex flex-col items-center justify-center p-8 min-h-52 transition-all duration-300 hover:border-gray-400"
            style={{
              borderColor: '#CCCCCC',
              backgroundColor: '#F9F9F9',
              boxShadow: `4px 4px 0px #E5E5E5`,
            }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={0.5}
            whileHover={{
              boxShadow: `6px 6px 0px #D5D5D5`,
            }}
          >
            <span className="text-4xl font-bold text-gray-300 mb-2">+</span>
            <p className="text-sm font-bold text-gray-600">Projects incoming</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
