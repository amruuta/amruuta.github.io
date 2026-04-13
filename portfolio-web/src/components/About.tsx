import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';
import { fadeInUp, staggerContainer, viewport } from '../lib/animations';

// Vibrant accent colors - Violet + Cyan
const colors = {
  violet: '#8B5CF6',
  violetLight: '#EDE9FE',
  cyan: '#06B6D4',
  cyanLight: '#CFFAFE',
};

export default function About() {
  const { personal, experience, education } = portfolioData;

  // Key achievements/stats
  const stats = [
    { value: '4+', label: 'Years', desc: 'Backend Engineering' },
    { value: '2', label: 'Companies', desc: 'Production Systems' },
    { value: '26', label: 'Instances', desc: 'Modernized & Deployed' },
  ];

  // Top 5 key capabilities
  const capabilities = [
    { title: 'Distributed Systems', tag: 'Backend', color: colors.violet },
    { title: 'Event-Driven Arch', tag: 'Kafka/JMS', color: colors.cyan },
    { title: 'Microservices', tag: 'Spring Boot', color: colors.violet },
    { title: 'Cloud Infrastructure', tag: 'AWS/Docker', color: colors.cyan },
    { title: 'Agentic AI', tag: 'LLM Systems', color: colors.violet },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <Container>
        <SectionHeading 
          label="About" 
          title={`${personal.name} — ${personal.title}`}
          subtitle="A backend engineer obsessed with scalable systems and clean architecture"
        />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {/* Left: The Story */}
          <motion.div 
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Who I am block */}
            <motion.div
              className="p-6 lg:p-8 border-4 border-black mb-8"
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
              <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: colors.violet }}>
                WHO I AM
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-medium">
                I'm a backend engineer with a proven track record of architecting and scaling high-throughput 
                financial systems. I don't just write code—I design systems. Whether it's{' '}
                <span className="font-black bg-yellow-300 px-1">eliminating legacy infrastructure</span>,{' '}
                <span className="font-black bg-yellow-300 px-1">modernizing monoliths</span>, or{' '}
                <span className="font-black bg-yellow-300 px-1">building ML-powered workflows</span>, I thrive 
                on solving complex architectural challenges.
              </p>
            </motion.div>

            {/* The Impact block */}
            <motion.div
              className="p-6 lg:p-8 border-4 border-black"
              style={{
                backgroundColor: colors.cyanLight,
                boxShadow: '4px 4px 0px #000000',
              }}
              variants={fadeInUp}
              custom={0.2}
              whileHover={{ 
                y: -2,
                boxShadow: '6px 6px 0px #000000',
              }}
            >
              <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: colors.cyan }}>
                WHAT I'VE SHIPPED
              </h3>
              <ul className="space-y-3">
                {[
                  'Modernized AML transaction monitoring platform from JBoss EAP to Spring Boot (40-50% throughput improvement)',
                  'Eliminated proprietary JBoss licensing across 26 production instances, saving significant infrastructure costs',
                  'Architected Kafka-based event streaming layer for trading platforms processing millions of transactions daily',
                  'Built Python ETL utility reducing daily report generation time from 8-10 hours to ~1 hour',
                  'Designed multi-module Maven architecture enabling independent builds and full local execution',
                ].map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-gray-700"
                    variants={fadeInUp}
                    custom={0.3 + i * 0.05}
                  >
                    <span style={{ color: colors.cyan }} className="font-black flex-shrink-0 text-lg">
                      ✦
                    </span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: Key Stats */}
          <motion.div 
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 border-4 border-black text-center"
                style={{
                  backgroundColor: idx % 2 === 0 ? colors.violetLight : colors.cyanLight,
                  borderColor: '#000000',
                  boxShadow: '4px 4px 0px #000000',
                }}
                variants={fadeInUp}
                custom={0.15 + idx * 0.1}
                whileHover={{ 
                  y: -3,
                  boxShadow: '6px 6px 0px #000000',
                }}
              >
                <div className="text-4xl font-black mb-2" style={{ color: idx % 2 === 0 ? colors.violet : colors.cyan }}>
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600 font-semibold">
                  {stat.desc}
                </div>
              </motion.div>
            ))}

            {/* Current role info */}
            <motion.div
              className="p-6 border-4 border-black"
              style={{
                backgroundColor: '#FFF9E6',
                borderColor: '#000000',
                boxShadow: '4px 4px 0px #000000',
              }}
              variants={fadeInUp}
              custom={0.45}
              whileHover={{ 
                y: -3,
                boxShadow: '6px 6px 0px #000000',
              }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-2">Active</p>
              <p className="text-sm font-bold text-gray-900 mb-1">
                {experience[0].position}
              </p>
              <p className="text-xs text-gray-700">
                {experience[0].company} · {experience[0].location}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Capabilities showcase */}
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h3 
            className="text-sm font-black uppercase tracking-widest mb-6 text-gray-900"
            variants={fadeInUp}
            custom={0.5}
          >
            Core Capabilities
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="p-4 border-3 border-black"
                style={{
                  backgroundColor: cap.color === colors.violet ? colors.violetLight : colors.cyanLight,
                  borderColor: cap.color,
                  boxShadow: `3px 3px 0px ${cap.color}`,
                }}
                variants={fadeInUp}
                custom={0.55 + i * 0.06}
                whileHover={{
                  y: -2,
                  boxShadow: `5px 5px 0px ${cap.color}`,
                }}
              >
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cap.color }}>
                  {cap.tag}
                </p>
                <p className="text-sm font-bold text-gray-900 leading-snug">
                  {cap.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Mindset */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Education */}
          <motion.div
            className="p-8 border-4 border-black"
            style={{
              backgroundColor: 'white',
              borderColor: colors.cyan,
              boxShadow: '4px 4px 0px ' + colors.cyan,
            }}
            variants={fadeInUp}
            custom={0.6}
            whileHover={{ 
              y: -2,
              boxShadow: '6px 6px 0px ' + colors.cyan,
            }}
          >
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: colors.cyan }}>
              Education
            </p>
            <h4 className="text-lg font-black mb-2 text-gray-900">
              {education[0].degree}
            </h4>
            <p className="text-sm text-gray-700 mb-3 font-semibold">
              {education[0].institution}
            </p>
            <div className="flex gap-2 flex-wrap">
              <span 
                className="text-xs font-bold px-3 py-1 border-2"
                style={{ borderColor: colors.cyan, backgroundColor: `${colors.cyan}15`, color: colors.cyan }}
              >
                {education[0].year}
              </span>
              <span 
                className="text-xs font-bold px-3 py-1 border-2 text-white"
                style={{ borderColor: colors.cyan, backgroundColor: colors.cyan }}
              >
                {education[0].achievement}
              </span>
            </div>
          </motion.div>

          {/* Engineering Mindset */}
          <motion.div
            className="p-8 border-4 border-black"
            style={{
              backgroundColor: 'white',
              borderColor: colors.violet,
              boxShadow: '4px 4px 0px ' + colors.violet,
            }}
            variants={fadeInUp}
            custom={0.65}
            whileHover={{ 
              y: -2,
              boxShadow: '6px 6px 0px ' + colors.violet,
            }}
          >
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: colors.violet }}>
              Engineering Mindset
            </p>
            <div className="space-y-2">
              {[
                'Systems-first thinking',
                'Write code for humans, not machines',
                'Optimize for scale AND clarity',
                'Measure impact, not just lines of code',
                'Embrace modern tooling (AI-assisted dev)',
              ].map((principle, i) => (
                <p key={i} className="text-sm text-gray-800 font-semibold flex gap-2">
                  <span style={{ color: colors.violet }} className="font-black">
                    ▸
                  </span>
                  {principle}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
